import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ENV } from '../common/env.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: ENV.JWT_SECRET,
          signOptions: { expiresIn: '30d' },
        };
      },
      global: true,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
