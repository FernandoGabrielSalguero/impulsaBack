import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LandingService } from './landing.service';

@Controller('landing')
@UseGuards(JwtAuthGuard)
export class LandingController {
    constructor(private readonly landingService: LandingService) { }

    // GET /landing/me
    @Get('me')
    async getMyLanding(@Req() req: any) {
        const user = req.user; // viene del JWT
        const landing = await this.landingService.findByUserId(user.id);
        return landing ?? null;
    }

    // POST /landing
    @Post()
    async saveMyLanding(
        @Req() req: any,
        @Body()
        body: {
            titulo: string;
            descripcion?: string;
            colorPrincipal?: string;
        },
    ) {
        const user = req.user;
        const landing = await this.landingService.upsertForUser(user.id, body);
        return landing;
    }
}
