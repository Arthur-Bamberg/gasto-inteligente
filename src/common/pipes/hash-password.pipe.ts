import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ENV } from '../env.config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password?: string): Promise<string> {
    if (!password)
      throw new BadRequestException('O campo `senha` não tem valor definido');
    return await bcrypt.hash(password, ENV.SALT);
  }
}
