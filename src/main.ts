import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ENV } from './modules/common/env.config';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { formatValidationErrors } from './modules/common/formatters/formatValidationErrors.formatter';
import { BaseResponseException } from './modules/common/exceptions/base-response.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const flatErrors = formatValidationErrors(errors);

        const messages = flatErrors.map((error) => {
          const constraints =
            error.constraints! || error.children![0].constraints;
          return `${Object.values(constraints).join(', ')}`;
        });

        throw new BaseResponseException(messages, HttpStatus.BAD_REQUEST);
      },
    }),
  );

  await app.listen(ENV.PORT);
}
bootstrap();
