import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateObjetivoDto {
  @IsNotEmpty({ message: 'O parâmetro `nome` é obrigatório' })
  @IsString({ message: 'O parâmetro `nome` deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'O parâmetro `valor` é obrigatório' })
  @IsNumber({}, { message: 'O parâmetro `valor` deve ser um número' })
  @IsPositive({ message: 'O parâmetro `valor` deve ser um número positivo' })
  valor: number;

  @IsNotEmpty({ message: 'O parâmetro `conta_id` é obrigatório' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'O parâmetro `conta_id` deve ser um número' },
  )
  @IsPositive({ message: 'O parâmetro `conta_id` deve ser um número positivo' })
  conta_id: number;
}
