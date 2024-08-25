import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BancosService } from './bancos.service';
import { TBaseResponse } from 'src/common/types/base-response.type';
import { convertBigIntToNumber } from 'src/common/utils';
import { contactManagerMessage } from 'src/common/constants';
import { Banco } from './entities/banco.entity';

@Controller('bancos')
export class BancosController {
  private readonly logger = new Logger(BancosController.name);

  constructor(private readonly bancosService: BancosService) {}

  @Get()
  async findAll(): Promise<TBaseResponse<Banco[]>> {
    try {
      const data = await this.bancosService.findAll();

      return {
        success: true,
        statusCode: 200,
        data: convertBigIntToNumber(data),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao buscar bancos: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao buscar bancos. ' + contactManagerMessage,
      );
    }
  }
}
