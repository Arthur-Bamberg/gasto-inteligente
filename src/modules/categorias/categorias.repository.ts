import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class CategoriasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto, userId: number) {
    return this.prisma.categorias.create({
      data: {
        ...createCategoriaDto,
        usuario_id: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.categorias.findMany({
      where: {
        OR: [
          {
            usuario_id: userId,
          },
          {
            usuario_id: null,
          },
        ],
        deleted_at: null,
      },
    });
  }

  async findTransacoesByCategorias(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.categorias.findMany({
      select: {
        id: true,
        nome: true,
        transacoes: {
          where: {
            data: {
              gte: startOfDay,
              lte: endOfDay,
            },
            deleted_at: null,
          },
        },
      },
      where: {
        usuario_id: userId,
        deleted_at: null,
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.categorias.findUnique({
      where: {
        id,
        usuario_id: userId,
        deleted_at: null,
      },
    });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categorias.update({
      where: {
        id,
      },
      data: updateCategoriaDto,
    });
  }

  async remove(id: number) {
    return this.prisma.categorias.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
