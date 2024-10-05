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
