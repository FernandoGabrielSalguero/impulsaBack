import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioGlobal } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuarioGlobal)
        private readonly usuariosRepo: Repository<UsuarioGlobal>,
    ) { }

    async crearUsuarioEmprendedor(dto: CreateUsuarioDto): Promise<UsuarioGlobal> {
        const existente = await this.usuariosRepo.findOne({
            where: { email: dto.email },
        });

        if (existente) {
            throw new ConflictException('Ya existe un usuario registrado con ese correo.');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const usuario = this.usuariosRepo.create({
            nombre: dto.nombre,
            email: dto.email,
            passwordHash,
            rol: 'emprendedor',
        });

        return this.usuariosRepo.save(usuario);
    }

    async buscarPorEmail(email: string): Promise<UsuarioGlobal | null> {
        return this.usuariosRepo.findOne({ where: { email } });
    }
}
