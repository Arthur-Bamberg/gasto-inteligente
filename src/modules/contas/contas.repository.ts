import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateContaDto } from './dto/create-conta.dto';

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
      where: {
        usuario_id: userId,
        deleted_at: null,
      },
    });
  }
}
