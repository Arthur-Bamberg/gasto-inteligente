import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateContaDto {
  @IsString({ message: 'A propriedade `nome` deve ser uma string' })
  @IsNotEmpty({ message: 'A propriedade `nome` não pode ser vazia' })
  nome: string;

  @IsInt({ message: 'A propriedade `banco_id` deve ser um número inteiro' })
  @IsPositive({
    message: 'A propriedade `banco_id` deve ser um número positivo',
  })
  banco_id: number;
}
