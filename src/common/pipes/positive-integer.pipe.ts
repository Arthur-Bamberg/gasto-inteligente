import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { BaseResponseException } from '../exceptions/base-response.exception';

@Injectable()
export class PositiveIntegerPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): number {
    if (
      isEmpty(value) ||
      typeof value !== 'string' ||
      !/^\d+$/.test(value) ||
      parseInt(value) <= 0
    )
      throw new BaseResponseException(
        [
          `O valor do parâmetro \`${metadata.data}\` deve ser um número inteiro e positivo.`,
        ],
        HttpStatus.BAD_REQUEST,
      );

    return parseInt(value);
  }
}
