import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    // Solo para probar: devuelve el usuario que viene en el token
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req: any) {
        // req.user lo carga JwtStrategy.validate()
        return req.user;
    }
}