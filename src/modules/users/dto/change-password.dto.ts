import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsUUID } from 'class-validator';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'email',
  'senha',
]) {
  @IsUUID(null, { message: 'Código de recuperação inválido.' })
  codigo_recuperacao: string;
}
