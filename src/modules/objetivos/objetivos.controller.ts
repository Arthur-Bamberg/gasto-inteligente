import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  InternalServerErrorException,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ObjetivosService } from './objetivos.service';
import { CreateObjetivoDto } from './dto/create-objetivo.dto';
import { UpdateObjetivoDto } from './dto/update-objetivo.dto';
import { convertBigIntToNumber } from 'src/common/utils';
import { contactManagerMessage } from 'src/common/constants';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { DetailedLogger } from 'src/common/loggers/detailed.logger';

@Controller('objetivos')
export class ObjetivosController {
  private readonly logger = new DetailedLogger(ObjetivosController.name);

  constructor(private readonly objetivosService: ObjetivosService) {}

  @Post()
  async create(
    @Body() createObjetivoDto: CreateObjetivoDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.objetivosService.create(
        createObjetivoDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao criar objetivo: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao criar objetivo. ' + contactManagerMessage,
      );
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    try {
      const data = await this.objetivosService.findAll(req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar objetivos: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar objetivos. ' + contactManagerMessage,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateObjetivoDto: UpdateObjetivoDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.objetivosService.update(
        id,
        updateObjetivoDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar objetivo: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao atualizar objetivo. ' + contactManagerMessage,
      );
    }
  }

  @Delete(':id')
  async deactivate(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.objetivosService.deactivate(id, req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao desativar objetivo: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao desativar objetivo. ' + contactManagerMessage,
      );
    }
  }
}
