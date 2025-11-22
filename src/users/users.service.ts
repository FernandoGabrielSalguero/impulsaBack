import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }

    async createEmprendedor(input: {
        nombre: string;
        email: string;
        passwordHash: string;
    }): Promise<User> {
        const user = this.usersRepo.create({
            nombre: input.nombre,
            email: input.email,
            passwordHash: input.passwordHash,
            rol: 'emprendedor', // rol por defecto
        });
        return this.usersRepo.save(user);
    }
}
