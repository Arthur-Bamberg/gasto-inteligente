import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContasRepository } from './contas.repository';

@Injectable()
export class ContasService {
  constructor(private readonly contasRepository: ContasRepository) {}

  async create(createContaDto: CreateContaDto, userId: number) {
    return this.contasRepository.create(createContaDto, userId);
  }

  async findAll(userId: number) {
    return this.contasRepository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const conta = await this.contasRepository.findOne(id, userId);

    if (!conta) throw new NotFoundException('Conta não encontrada');

    return conta;
  }

  async update(id: number, updateContaDto: UpdateContaDto, userId: number) {
    await this.findOne(id, userId);

    return this.contasRepository.update(id, updateContaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
