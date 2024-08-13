import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { contactManagerMessage } from '../common/constants';
import { AuthService } from '../auth/auth.service';
import { CodeGeneratorService } from '../common/services/code-generator.service';
import { ENV } from '../common/env.config';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { convertBigIntToNumber, isWithin30MinutesNow } from '../common/utils';
import { UserIdentity } from '../common/types/user-identity.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly codeGeneratorService: CodeGeneratorService,
  ) {}

  async login(email: string, password: string): Promise<UserIdentity> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      // Intentional not descriptive error message
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );

    if (user.deleted_at)
      throw new BadRequestException(
        'Usuário desativado. ' + contactManagerMessage,
      );

    return await this.authService.handleLogin(user, password);
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (userExists && userExists.deleted_at)
      throw new BadRequestException(
        'E-mail já cadastrado para usuário deletado. ' + contactManagerMessage,
      );

    if (userExists) throw new BadRequestException('E-mail já cadastrado.');

    const userData = await this.usersRepository.create(createUserDto);

    return await this.authService.genereateToken(
      convertBigIntToNumber(userData),
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findBydId(id);

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userExists = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );

      if (userExists && userExists.deleted_at)
        throw new BadRequestException(
          'E-mail já cadastrado para usuário deletado. ' +
            contactManagerMessage,
        );

      if (userExists) throw new BadRequestException('E-mail já cadastrado.');
    }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    Object.assign(user, updatedUser);

    return await this.authService.genereateToken(convertBigIntToNumber(user));
  }

  async resetPassword(email: string) {
    const user = await this.usersRepository.findActiveByEmail(email);

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const code = this.codeGeneratorService.generateCode();

    const hashedCode = await bcrypt.hash(code, ENV.SALT);

    await this.usersRepository.updateCode(user.id, hashedCode);

    // TODO: Send e-mail with code
    console.log(code);
  }

  async updatePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findActiveByEmail(
      changePasswordDto.email,
    );

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    if (!isWithin30MinutesNow(user.updated_at))
      throw new BadRequestException('Código expirado.');

    const isValidCode = await this.codeGeneratorService.validateCode(
      changePasswordDto.codigo_recuperacao,
      user.codigo_recuperacao,
    );

    if (!isValidCode) throw new BadRequestException('Código inválido.');

    const [userIdentity] = await Promise.all([
      this.authService.genereateToken(convertBigIntToNumber(user)),
      this.usersRepository.changePassword(
        changePasswordDto.email,
        changePasswordDto.senha,
      ),
    ]);

    return userIdentity;
  }

  async disable(id: number) {
    await this.usersRepository.disable(id);
  }
}
