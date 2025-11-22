import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { jwtConstants } from './auth.constants';
import { User } from '../users/user.entity';

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    private buildPayload(user: User): {
        sub: number;
        email: string;
        rol: string;
        nombre: string;
    } {
        return {
            sub: user.id,
            email: user.email,
            rol: user.rol,
            nombre: user.nombre,
        };
    }

    private async generateTokens(user: User): Promise<AuthTokens> {
        const payload: {
            sub: number;
            email: string;
            rol: string;
            nombre: string;
        } = this.buildPayload(user);

        const accessOptions: JwtSignOptions = {
            secret: jwtConstants.accessSecret,
            expiresIn: jwtConstants.accessExpiresIn,   // ahora es number
        };

        const refreshOptions: JwtSignOptions = {
            secret: jwtConstants.refreshSecret,
            expiresIn: jwtConstants.refreshExpiresIn,  // number también
        };

        const accessToken = await this.jwtService.signAsync(payload, accessOptions);
        const refreshToken = await this.jwtService.signAsync(payload, refreshOptions);

        return { accessToken, refreshToken };
    }

    // Registro de emprendedor
    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new BadRequestException('El correo ya está registrado');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.createEmprendedor({
            nombre: dto.nombre,
            email: dto.email,
            passwordHash,
        });

        const tokens = await this.generateTokens(user);

        // devolvemos tokens + datos del usuario sin password
        const { passwordHash: _, ...userSafe } = user;
        return { ...tokens, user: userSafe };
    }

    // Login
    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('El usuario no existe');
        }

        const ok = await bcrypt.compare(dto.password, user.passwordHash);
        if (!ok) {
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        const tokens = await this.generateTokens(user);
        const { passwordHash: _, ...userSafe } = user;

        return { ...tokens, user: userSafe };
    }

    // Refresh tokens
    async refresh(dto: RefreshDto) {
        try {
            const payload = await this.jwtService.verifyAsync<any>(
                dto.refreshToken,
                {
                    secret: jwtConstants.refreshSecret,
                },
            );

            const user = await this.usersService.findById(payload.sub);
            const tokens = await this.generateTokens(user);
            const { passwordHash: _, ...userSafe } = user;

            return { ...tokens, user: userSafe };
        } catch {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }
    }
}
