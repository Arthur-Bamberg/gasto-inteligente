import { Injectable, NotFoundException } from '@nestjs/common';
import { TransacoesRepository } from './transacoes.repository';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { Transacao } from './entities/transacao.entity';
import { ContasService } from '../contas/contas.service';
import { TipoTransacao } from 'src/common/enums/tipo-transacao.enum';

@Injectable()
export class TransacoesService {
  constructor(
    private readonly transacoesRepository: TransacoesRepository,
    private readonly contasService: ContasService,
  ) {}

  async create(createTransacaoDto: CreateTransacaoDto, userId: number) {
    await this.updateSaldo(
      createTransacaoDto.conta_id,
      createTransacaoDto.valor,
      createTransacaoDto.tipo === TipoTransacao.DESPESA,
      userId,
    );

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

    const tiposMaisSaldo = [TipoTransacao.INVESTIMENTO, TipoTransacao.RECEITA];

    const valoresDiferentes = Boolean(
      updateTransacaoDto.valor && updateTransacaoDto.valor !== transacao.valor,
    );

    const tiposEquivalentes =
      updateTransacaoDto.tipo === transacao.tipo ||
      !updateTransacaoDto.tipo ||
      (tiposMaisSaldo.includes(updateTransacaoDto.tipo) &&
        tiposMaisSaldo.includes(transacao.tipo as TipoTransacao));

    switch (true) {
      case valoresDiferentes &&
        tiposEquivalentes &&
        Boolean(updateTransacaoDto.valor):
        await this.updateSaldo(
          updateTransacaoDto.conta_id ??
            (transacao.conta_id as unknown as number),
          updateTransacaoDto.valor! - transacao.valor,
          updateTransacaoDto.tipo
            ? updateTransacaoDto.tipo === TipoTransacao.DESPESA
            : (transacao.tipo as TipoTransacao) === TipoTransacao.DESPESA,
          userId,
        );
        break;
      case valoresDiferentes &&
        updateTransacaoDto.tipo &&
        !tiposEquivalentes &&
        Boolean(updateTransacaoDto.valor):
        await this.updateSaldo(
          updateTransacaoDto.conta_id ??
            (transacao.conta_id as unknown as number),
          updateTransacaoDto.valor! + transacao.valor,
          updateTransacaoDto.tipo === TipoTransacao.DESPESA,
          userId,
        );
        break;
      case !updateTransacaoDto.valor &&
        updateTransacaoDto.tipo &&
        !tiposEquivalentes:
        await this.updateSaldo(
          updateTransacaoDto.conta_id ??
            (transacao.conta_id as unknown as number),
          transacao.valor * 2,
          updateTransacaoDto.tipo === TipoTransacao.DESPESA,
          userId,
        );
        break;
    }

    return this.transacoesRepository.update(
      id,
      updateTransacaoDto as unknown as Transacao,
    );
  }

  async remove(id: number, userId: number) {
    const transacao = await this.findOne(id, userId);

    await this.updateSaldo(
      transacao.conta_id as unknown as number,
      transacao.valor,
      transacao.tipo !== TipoTransacao.DESPESA,
      userId,
    );

    return this.transacoesRepository.remove(id);
  }

  private async updateSaldo(
    conta_id: number,
    valor: number,
    ehGasto: boolean,
    userId: number,
  ) {
    const conta = await this.contasService.findOne(conta_id, userId);

    if (ehGasto) {
      await this.contasService.update(
        conta_id,
        { saldo: conta.saldo - valor },
        userId,
      );
      return;
    }

    await this.contasService.update(
      conta_id,
      { saldo: conta.saldo + valor },
      userId,
    );
  }
}
