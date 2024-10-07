import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Injectable()
export class ContasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(conta: CreateContaDto, userId: number) {
    return this.prismaService.contas.create({
      data: {
        ...conta,
        usuario_id: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.contas.findMany({
      select: {
        id: true,
        nome: true,
        saldo: true,
        banco: true,
      },
      where: {
        usuario_id: userId,
        deleted_at: null,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prismaService.contas.findUnique({
      where: { id, usuario_id: userId },
    });
  }

  async update(id: number, conta: UpdateContaDto) {
    return this.prismaService.contas.update({
      where: { id },
      data: conta,
    });
  }
}
