import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriasRepository } from './categorias.repository';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriasRepository) {}

  async create(createCategoriaDto: CreateCategoriaDto, userId: number) {
    return this.categoriasRepository.create(createCategoriaDto, userId);
  }

  async findAll(userId: number) {
    return this.categoriasRepository.findAll(userId);
  }

  async findTransacoesByCategorias(
    userId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const categorias =
      await this.categoriasRepository.findTransacoesByCategorias(
        userId,
        startDate,
        endDate,
      );

    return categorias
      .map((categoria) => {
        let amount = 0;

        for (const transacao of categoria.transacoes) {
          amount += transacao.valor;
        }

        return {
          ...categoria,
          amount,
        };
      })
      .filter((categoria) => categoria.transacoes.length);
  }

  async findOne(id: number, userId: number) {
    const categoria = await this.categoriasRepository.findOne(id, userId);

    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
    userId: number,
  ) {
    await this.categoriasRepository.findOne(id, userId);

    return this.categoriasRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number, userId: number) {
    await this.categoriasRepository.findOne(id, userId);

    return this.categoriasRepository.remove(id);
  }
}
