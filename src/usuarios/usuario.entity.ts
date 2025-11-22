import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios_globales')
export class UsuarioGlobal {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string;

    @Column({ name: 'password_hash', type: 'varchar', length: 255 })
    passwordHash: string;

    @Column({ type: 'varchar', length: 50 })
    rol: string;

    @CreateDateColumn({ name: 'creado_en', type: 'datetime' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'datetime', nullable: true })
    actualizadoEn: Date;
}
