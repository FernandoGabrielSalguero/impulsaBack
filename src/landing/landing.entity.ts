import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('landing_pages')
export class LandingPage {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ name: 'usuario_id', unsigned: true })
    usuarioId: number;

    @Column({ length: 255 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string | null;

    // 👇 OJO acá: tipo VARCHAR, y la propiedad en TS es string | null
    @Column({
        name: 'color_principal',
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    colorPrincipal: string | null;

    @UpdateDateColumn({ name: 'actualizado_en' })
    actualizadoEn: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;
}
