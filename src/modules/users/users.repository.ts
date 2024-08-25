import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.usuarios.create({
      data: createUserDto,
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.usuarios.findUnique({
      where: { email },
    });
  }

  async findActiveByEmail(email: string) {
    return await this.prismaService.usuarios.findFirst({
      where: { email, deleted_at: null },
    });
  }

  async findBydId(id: number) {
    return await this.prismaService.usuarios.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.usuarios.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateCode(id: bigint, code: string) {
    return await this.prismaService.usuarios.update({
      where: { id },
      data: { codigo_recuperacao: code },
    });
  }

  async changePassword(email: string, password: string) {
    return await this.prismaService.usuarios.update({
      where: { email },
      data: { senha: password, codigo_recuperacao: null },
    });
  }

  async disable(id: number) {
    return await this.prismaService.usuarios.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
