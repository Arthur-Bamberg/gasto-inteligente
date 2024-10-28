import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjetivoDto } from './dto/create-objetivo.dto';
import { UpdateObjetivoDto } from './dto/update-objetivo.dto';
import { ObjetivosRepository } from './objetivos.repository';
import { ContasService } from '../contas/contas.service';

@Injectable()
export class ObjetivosService {
  constructor(
    private readonly objetivosRepository: ObjetivosRepository,
    private readonly contasService: ContasService,
  ) {}

  async create(createObjetivoDto: CreateObjetivoDto, userId: number) {
    await this.contasService.findOne(createObjetivoDto.conta_id, userId);

    return this.objetivosRepository.create(createObjetivoDto);
  }

  async findAll(userId: number) {
    return this.objetivosRepository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const objetivo = await this.objetivosRepository.findOne(id, userId);

    if (!objetivo) throw new NotFoundException('objetivo não encontrado');

    return objetivo;
  }

  async update(
    id: number,
    updateObjetivoDto: UpdateObjetivoDto,
    userId: number,
  ) {
    await this.findOne(id, userId);

    if (updateObjetivoDto.conta_id)
      await this.contasService.findOne(updateObjetivoDto.conta_id, userId);

    return this.objetivosRepository.update(id, updateObjetivoDto);
  }

  async deactivate(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.objetivosRepository.deactivate(id);
  }
}
