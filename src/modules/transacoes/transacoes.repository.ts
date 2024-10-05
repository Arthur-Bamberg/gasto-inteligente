import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Transacao } from './entities/transacao.entity';

@Injectable()
export class TransacoesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(transacao: Transacao) {
    return this.prisma.transacoes.create({
      data: transacao,
    });
  }

  async findAll(usuario_id: number) {
    return this.prisma.transacoes.findMany({
      where: {
        usuario_id,
        deleted_at: null,
      },
    });
  }

  async findOne({ id, usuario_id }: { id: number; usuario_id: number }) {
    return this.prisma.transacoes.findUnique({
      where: {
        id,
        usuario_id,
      },
    });
  }

  async update(id: number, transacao: Transacao) {
    return this.prisma.transacoes.update({
      where: {
        id,
      },
      data: transacao,
    });
  }

  async remove(id: number) {
    return this.prisma.transacoes.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
