import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',          // 👈 CAMBIAR SI CORRESPONDE
      password: '',              // 👈 CAMBIAR SI CORRESPONDE
      database: 'impulsa_db',    // 👈 tu base
      entities: [User],
      synchronize: false,        // la tabla ya existe, no la toques
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
