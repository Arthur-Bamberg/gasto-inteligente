import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasRepository } from './categorias.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService, CategoriasRepository, PrismaService],
})
export class CategoriasModule {}
