import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LandingPage } from './landing/landing.entity';
import { LandingModule } from './landing/landing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',            // tu usuario
      password: 'impulsa',     // tu password
      database: 'impulsa_db',
      entities: [User, LandingPage],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    LandingModule,   // 👈 IMPORTANTE
  ],
})
export class AppModule {}
