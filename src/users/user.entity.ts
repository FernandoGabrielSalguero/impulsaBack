import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios_globales')
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 150, unique: true })
    email: string;

    @Column({ name: 'password_hash', length: 255 })
    passwordHash: string;

    @Column({ length: 50 })
    rol: string;

    @CreateDateColumn({ name: 'creado_en' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', nullable: true })
    actualizadoEn: Date | null;
}
