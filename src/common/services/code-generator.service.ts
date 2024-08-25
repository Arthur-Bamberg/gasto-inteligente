import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CodeGeneratorService {
  generateCode(): string {
    return randomUUID();
  }

  async validateCode(code: string, hashedCode: string): Promise<boolean> {
    return await bcrypt.compare(code, hashedCode);
  }
}
