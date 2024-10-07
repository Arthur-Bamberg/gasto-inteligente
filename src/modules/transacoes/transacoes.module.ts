import { Module } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { TransacoesController } from './transacoes.controller';
import { TransacoesRepository } from './transacoes.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { ContasModule } from '../contas/contas.module';

@Module({
  imports: [ContasModule],
  controllers: [TransacoesController],
  providers: [TransacoesService, TransacoesRepository, PrismaService],
})
export class TransacoesModule {}
