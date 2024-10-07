import { TipoTransacao } from 'src/common/enums/tipo-transacao.enum';

export class Transacao {
  valor: number;
  tipo: TipoTransacao;
  data: Date;
  descricao?: string;
  conta_id: number;
  categoria_id?: number;
  loja_id?: number;
  usuario_id: number;
}
