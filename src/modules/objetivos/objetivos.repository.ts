import { Injectable } from '@nestjs/common';
import { CreateObjetivoDto } from './dto/create-objetivo.dto';
import { UpdateObjetivoDto } from './dto/update-objetivo.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class ObjetivosRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createObjetivoDto: CreateObjetivoDto) {
    return this.prismaService.objetivos.create({
      data: createObjetivoDto,
    });
  }

  async findAll(userId: number) {
    return this.prismaService.objetivos.findMany({
      where: {
        conta: {
          usuario_id: userId,
        },
        deleted_at: null,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prismaService.objetivos.findUnique({
      where: {
        id,
        conta: {
          usuario_id: userId,
        },
      },
    });
  }

  async update(id: number, updateObjetivoDto: UpdateObjetivoDto) {
    return this.prismaService.objetivos.update({
      data: updateObjetivoDto,
      where: { id },
    });
  }

  async deactivate(id: number) {
    return this.prismaService.objetivos.update({
      data: {
        deleted_at: new Date(),
      },
      where: { id },
    });
  }
}
