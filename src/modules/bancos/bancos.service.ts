import { Injectable } from '@nestjs/common';
import { ExpirableData } from 'src/common/types/expirable-data.type';
import { Banco } from './entities/banco.entity';
import { BancosRepository } from './bancos.repository';
import { getSecondsNow } from 'src/common/utils';

@Injectable()
export class BancosService {
  private bancos: ExpirableData<Banco[]> = {
    data: [],
    expiresAt: 0,
  };

  constructor(private readonly bancosRepository: BancosRepository) {}

  async findAll() {
    if (this.bancos.expiresAt > getSecondsNow()) return this.bancos.data;

    const bancos = await this.bancosRepository.findAll();

    const ONE_DAY = 60 * 60 * 24;

    this.bancos = {
      data: bancos,
      expiresAt: getSecondsNow() + ONE_DAY,
    };

    return bancos;
  }
}
