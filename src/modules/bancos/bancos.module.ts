import { Module } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';
import { BancosRepository } from './bancos.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [BancosController],
  providers: [BancosService, BancosRepository, PrismaService],
})
export class BancosModule {}
