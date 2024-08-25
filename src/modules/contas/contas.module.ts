import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { ContasRepository } from './contas.repository';
import { PrismaService } from '../../common/services/prisma.service';

@Module({
  controllers: [ContasController],
  providers: [ContasService, ContasRepository, PrismaService],
})
export class ContasModule {}
