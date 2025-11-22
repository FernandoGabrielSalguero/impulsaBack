import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingPage } from './landing.entity';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LandingPage])],
    providers: [LandingService],
    controllers: [LandingController],
})
export class LandingModule { }
