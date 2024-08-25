import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ENV } from '../env.config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password?: string): Promise<string> {
    if (password) return await bcrypt.hash(password, ENV.SALT);
  }
}
