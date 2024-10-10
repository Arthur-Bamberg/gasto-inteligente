import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { BaseResponseException } from '../exceptions/base-response.exception';
import { parseISO } from 'date-fns';
import { isValidDate } from '../utils';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Date {
    if (!isValidDate(value)) {
      throw new BaseResponseException(
        [
          `O valor do parâmetro \`${metadata.data}\` deve ser uma data válida no formato \`yyyy-mm-dd\`.`,
        ],
        HttpStatus.BAD_REQUEST,
      );
    }
    return parseISO(value);
  }
}
