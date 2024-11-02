import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  InternalServerErrorException,
  Req,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { contactManagerMessage } from '../../common/constants';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { convertBigIntToNumber } from '../../common/utils';
import { UpdateContaDto } from './dto/update-conta.dto';
import { DetailedLogger } from 'src/common/loggers/detailed.logger';

@Controller('contas')
export class ContasController {
  private readonly logger = new DetailedLogger(ContasController.name);
  constructor(private readonly contasService: ContasService) {}

  @Post()
  async create(
    @Body() createContaDto: CreateContaDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.contasService.create(
        createContaDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao criar conta: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao criar conta. ' + contactManagerMessage,
      );
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    try {
      const data = await this.contasService.findAll(req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar contas: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar contas. ' + contactManagerMessage,
      );
    }
  }

  @Get(':id/transacoes')
  async getTransacoesByConta(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.contasService.getTransacoesByConta(
        id,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar transações por conta: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar transações por conta. ' + contactManagerMessage,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateContaDto: UpdateContaDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.contasService.update(
        id,
        updateContaDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar conta: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao atualizar conta. ' + contactManagerMessage,
      );
    }
  }

  @Delete(':id')
  async deactivate(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.contasService.deactivate(id, req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao desativar conta: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao desativar conta. ' + contactManagerMessage,
      );
    }
  }
}
