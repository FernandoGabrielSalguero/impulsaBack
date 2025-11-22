import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioGlobal } from './usuario.entity';
import { UsuariosService } from './usuarios.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioGlobal])],
    providers: [UsuariosService],
    exports: [UsuariosService],
})
export class UsuariosModule { }
