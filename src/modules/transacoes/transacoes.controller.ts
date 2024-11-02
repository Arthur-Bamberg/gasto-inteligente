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
} from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { contactManagerMessage } from 'src/common/constants';
import { convertBigIntToNumber } from 'src/common/utils';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { PositiveIntegerPipe } from 'src/common/pipes/positive-integer.pipe';
import { DetailedLogger } from 'src/common/loggers/detailed.logger';

@Controller('transacoes')
export class TransacoesController {
  private readonly logger = new DetailedLogger(TransacoesController.name);

  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  async create(
    @Body() createTransacaoDto: CreateTransacaoDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.transacoesService.create(
        createTransacaoDto,
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
        'Erro ao criar transação. ' + contactManagerMessage,
      );
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    try {
      const data = await this.transacoesService.findAll(req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar transações: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar transações. ' + contactManagerMessage,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new PositiveIntegerPipe()) id: number,
    @Body() updateTransacaoDto: UpdateTransacaoDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.transacoesService.update(
        id,
        updateTransacaoDto,
        req.user.sub,
      );

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar transação: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao atualizar transação. ' + contactManagerMessage,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new PositiveIntegerPipe()) id: number,
    @Req() req: RequestWithUser,
  ) {
    try {
      const data = await this.transacoesService.remove(id, req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao excluir transação: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao excluir transação. ' + contactManagerMessage,
      );
    }
  }
}
