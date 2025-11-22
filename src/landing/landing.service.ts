import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingPage } from './landing.entity';

@Injectable()
export class LandingService {
    constructor(
        @InjectRepository(LandingPage)
        private readonly landingRepo: Repository<LandingPage>,
    ) { }

    async findByUserId(usuarioId: number): Promise<LandingPage | null> {
        return this.landingRepo.findOne({ where: { usuarioId } });
    }

    async upsertForUser(usuarioId: number, data: Partial<LandingPage>) {
        let landing = await this.findByUserId(usuarioId);

        if (!landing) {
            landing = this.landingRepo.create({ usuarioId });
        }

        landing.titulo = data.titulo ?? landing.titulo;
        landing.descripcion = data.descripcion ?? landing.descripcion;
        landing.colorPrincipal = data.colorPrincipal ?? landing.colorPrincipal;

        return this.landingRepo.save(landing);
    }
}
