import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findOne(id: number) {
    return this.contasRepository.findOne(id);
  }

  async update(id: number, updateContaDto: UpdateContaDto, userId: number) {
    const conta = await this.contasRepository.findOne(id);

    if (!conta) throw new NotFoundException('Conta não encontrada');

    if (Number(conta.usuario_id) !== userId)
      throw new UnauthorizedException('Conta não autorizada para o usuário');

    return this.contasRepository.update(id, updateContaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
