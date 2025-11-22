import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService) { }

    async register(dto: CreateUsuarioDto) {
        const usuario = await this.usuariosService.crearUsuarioEmprendedor(dto);
        // devolvemos sin el hash
        const { passwordHash, ...rest } = usuario;
        return rest;
    }

    async login(dto: LoginDto) {
        const usuario = await this.usuariosService.buscarPorEmail(dto.email);

        if (!usuario) {
            throw new NotFoundException('El usuario (correo) no está registrado.');
        }

        const passwordValida = await bcrypt.compare(
            dto.password,
            usuario.passwordHash,
        );

        if (!passwordValida) {
            throw new UnauthorizedException('La contraseña es incorrecta.');
        }

        const { passwordHash, ...rest } = usuario;

        // En una app real devolveríamos un JWT; por ahora devolvemos los datos del usuario
        return rest;
    }
}
