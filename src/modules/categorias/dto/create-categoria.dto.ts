import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({ message: 'A propriedade `nome` deve ser uma string' })
  @IsNotEmpty({ message: 'A propriedade `nome` não pode ser vazia' })
  nome: string;

  @IsString({ message: 'A propriedade `descricao` deve ser uma string' })
  @IsOptional()
  descricao?: string;
}
