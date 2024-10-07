import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoTransacao } from 'src/common/enums/tipo-transacao.enum';

export class CreateTransacaoDto {
  @IsNumber({}, { message: '`valor` deve ser um número' })
  @IsNotEmpty({ message: '`valor` é obrigatório' })
  valor: number;

  @IsEnum(TipoTransacao, {
    message: '`tipo` deve ser um tipo de transação válido',
  })
  @IsNotEmpty({ message: '`tipo` é obrigatório' })
  tipo: TipoTransacao;

  @IsDateString({}, { message: '`data` deve ser uma data válida' })
  @IsNotEmpty({ message: '`data` é obrigatório' })
  data: string;

  @IsString({ message: '`descricao` deve ser uma string' })
  @IsOptional()
  descricao?: string;

  @IsNumber({}, { message: '`conta_id` deve ser um número' })
  @IsNotEmpty({ message: '`conta_id` é obrigatório' })
  conta_id: number;

  @IsNumber({}, { message: '`categoria_id` deve ser um número' })
  @IsOptional()
  categoria_id?: number;

  @IsNumber({}, { message: '`loja_id` deve ser um número' })
  @IsOptional()
  loja_id?: number;
}
