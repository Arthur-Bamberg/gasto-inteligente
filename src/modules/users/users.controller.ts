import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  HttpException,
  Logger,
  InternalServerErrorException,
  BadRequestException,
  Req,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { HashPasswordPipe } from '../../common/pipes/hash-password.pipe';
import { TBaseResponse } from '../../common/types/base-response.type';
import { UserIdentity } from '../../common/types/user-identity.type';
import { Auth } from '../auth/entities/auth.entity';
import {
  contactManagerMessage,
  passwordInvalidMessage,
} from '../../common/constants';
import { passwordValidator } from '../../common/validators/password.validator';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { validateDTO } from '../../common/utils';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @IsPublic()
  async create(
    @Body() { senha, ...userData }: CreateUserDto,
    @Body('senha', HashPasswordPipe) hashedPassword: string,
  ): Promise<TBaseResponse<UserIdentity>> {
    try {
      if (!passwordValidator(senha))
        throw new BadRequestException(passwordInvalidMessage);

      return {
        success: true,
        statusCode: 201,
        data: await this.usersService.create({
          ...userData,
          senha: hashedPassword,
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao criar usuário: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao ao criar usuário. ' + contactManagerMessage,
      );
    }
  }

  @Post('reset-password')
  @IsPublic()
  async resetPassword(
    @Body('email') email: string,
  ): Promise<TBaseResponse<{ message: string }>> {
    try {
      await this.usersService.resetPassword(email);
      return {
        success: true,
        statusCode: 200,
        data: {
          message: 'Um e-mail foi enviado com o código para resetar a senha.',
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao resetar a senha: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao ao resetar a senha. ' + contactManagerMessage,
      );
    }
  }

  @Patch()
  async update(
    @Body() userData: UpdateUserDto,
    @Req() req: RequestWithUser,
  ): Promise<TBaseResponse<UserIdentity>> {
    try {
      if (userData.senha && !passwordValidator(userData.senha))
        throw new BadRequestException(passwordInvalidMessage);

      return {
        success: true,
        statusCode: 200,
        data: await this.usersService.update(+req.user.sub, userData),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar usuário: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao ao atualizar usuário. ' + contactManagerMessage,
      );
    }
  }

  @Patch('password')
  @IsPublic()
  async updatePassword(
    @Body() changePasswordData: ChangePasswordDto,
    @Body('senha', HashPasswordPipe) hashedPassword: string,
  ): Promise<TBaseResponse<{ message: string }>> {
    try {
      if (!passwordValidator(changePasswordData.senha))
        throw new BadRequestException(passwordInvalidMessage);

      await this.usersService.updatePassword({
        ...changePasswordData,
        senha: hashedPassword,
      });

      return {
        success: true,
        statusCode: 200,
        data: { message: 'Senha atualizada com sucesso.' },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao atualizar a senha: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao ao atualizar a senha. ' + contactManagerMessage,
      );
    }
  }

  @Delete()
  async disable(
    @Req() req: RequestWithUser,
  ): Promise<TBaseResponse<{ message: string }>> {
    try {
      await this.usersService.disable(+req.user.sub);

      return {
        success: true,
        statusCode: 200,
        data: { message: 'Usuário desativado com sucesso.' },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao desativar usuário: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao desativar usuário. ' + contactManagerMessage,
      );
    }
  }

  @IsPublic()
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginData: unknown,
  ): Promise<TBaseResponse<UserIdentity>> {
    try {
      const errors = await validateDTO(loginData, Auth);

      if (errors.length)
        // Intentional not descriptive error message
        throw new UnauthorizedException(
          'O e-mail ou a senha informados está incorreto.',
        );

      const { email, senha } = loginData as Auth;

      return {
        success: true,
        statusCode: 200,
        data: await this.usersService.login(email, senha),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error(`Erro ao fazer login do usuário: ${error}`);

      throw new InternalServerErrorException(
        'Erro ao realizar login. ' + contactManagerMessage,
      );
    }
  }
}
