import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '`nome` deve ser um texto.' })
  @IsNotEmpty({ message: '`nome` não pode ser vazio.' })
  nome: string;

  @IsEmail(
    {},
    {
      message:
        '`email` fornecido não é válido. Por favor, insira um email correto.',
    },
  )
  email: string;

  @IsString({ message: '`senha` deve ser um texto.' })
  @Length(8, 20, { message: '`senha` deve ter entre 8 e 20 caracteres.' })
  senha: string;
}
