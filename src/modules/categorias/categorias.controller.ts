import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { convertBigIntToNumber } from 'src/common/utils';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { contactManagerMessage } from 'src/common/constants';
import { PositiveIntegerPipe } from 'src/common/pipes/positive-integer.pipe';
import { DatePipe } from 'src/common/pipes/date.pipe';
import { DetailedLogger } from 'src/common/loggers/detailed.logger';

@Controller('categorias')
export class CategoriasController {
  private readonly logger = new DetailedLogger(CategoriasController.name);
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(
    @Body() createCategoriaDto: CreateCategoriaDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.categoriasService.create(
        createCategoriaDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao criar categoria: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao criar categoria. ' + contactManagerMessage,
      );
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    try {
      const data = await this.categoriasService.findAll(req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar categorias: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar categorias. ' + contactManagerMessage,
      );
    }
  }

  @Get('transacoes')
  async findTransacoesByCategorias(
    @Req() req: RequestWithUser,
    @Query('start-date', new DatePipe()) startDate: Date,
    @Query('end-date', new DatePipe()) endDate: Date,
  ) {
    try {
      const data = await this.categoriasService.findTransacoesByCategorias(
        req.user.sub,
        startDate,
        endDate,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar categorias: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar categorias. ' + contactManagerMessage,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new PositiveIntegerPipe()) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.categoriasService.update(
        id,
        updateCategoriaDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar categoria: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao atualizar categoria. ' + contactManagerMessage,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new PositiveIntegerPipe()) id: number,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.categoriasService.remove(id, req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao deletar categoria: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao deletar categoria. ' + contactManagerMessage,
      );
    }
  }
}
