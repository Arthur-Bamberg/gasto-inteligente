import { Module } from '@nestjs/common';
import { ObjetivosService } from './objetivos.service';
import { ObjetivosController } from './objetivos.controller';
import { ContasModule } from '../contas/contas.module';
import { ObjetivosRepository } from './objetivos.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [ObjetivosController],
  providers: [ObjetivosService, ObjetivosRepository, PrismaService],
  imports: [ContasModule],
})
export class ObjetivosModule {}
