import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../common/services/prisma.service';
import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    CodeGeneratorService,
    EmailService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
