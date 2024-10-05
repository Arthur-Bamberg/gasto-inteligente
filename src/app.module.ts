import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { ContasModule } from './modules/contas/contas.module';
import { BancosModule } from './modules/bancos/bancos.module';
import { TransacoesModule } from './modules/transacoes/transacoes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ContasModule,
    BancosModule,
    TransacoesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
