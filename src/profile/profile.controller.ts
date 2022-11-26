import { AuthGuard } from '@nestjs/passport';
/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('profile')
export class ProfileController {

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getProfile() {
        return "I am protected route";
    }
}
