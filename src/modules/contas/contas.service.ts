import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ContasRepository } from './contas.repository';

@Injectable()
export class ContasService {
  constructor(private readonly contasRepository: ContasRepository) {}

  async create(createContaDto: CreateContaDto, userId: number) {
    return await this.contasRepository.create(createContaDto, userId);
  }

  async findAll(userId: number) {
    return await this.contasRepository.findAll(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} conta`;
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return `This action updates a #${id} conta`;
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
