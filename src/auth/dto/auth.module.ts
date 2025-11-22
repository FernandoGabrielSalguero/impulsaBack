import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './auth.constants';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: jwtConstants.accessSecret, // se puede sobreescribir en sign()
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
