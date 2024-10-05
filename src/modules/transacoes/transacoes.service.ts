import { Injectable, NotFoundException } from '@nestjs/common';
import { TransacoesRepository } from './transacoes.repository';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { Transacao } from './entities/transacao.entity';

@Injectable()
export class TransacoesService {
  constructor(private readonly transacoesRepository: TransacoesRepository) {}

  async create(createTransacaoDto: CreateTransacaoDto, userId: number) {
    return this.transacoesRepository.create({
      ...createTransacaoDto,
      usuario_id: userId,
      data: new Date(createTransacaoDto.data),
    });
  }

  async findAll(userId: number) {
    return this.transacoesRepository.findAll(userId);
  }

  private async findOne(id: number, userId: number) {
    const transacao = await this.transacoesRepository.findOne({
      id,
      usuario_id: userId,
    });

    if (!transacao) throw new NotFoundException('Transação não encontrada');

    return transacao;
  }

  async update(
    id: number,
    updateTransacaoDto: UpdateTransacaoDto,
    userId: number,
  ) {
    const transacao = await this.findOne(id, userId);

    Object.assign(transacao, updateTransacaoDto);

    return this.transacoesRepository.update(
      id,
      transacao as unknown as Transacao,
    );
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.transacoesRepository.remove(id);
  }
}
