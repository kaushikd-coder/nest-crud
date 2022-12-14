/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor( private readonly userService : UserService,  private jwtService: JwtService){}

    async validateUser( email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if(user && user.password === pass){
                return user;
        }
        return null;
    }

    async login(user:any){
        const payload = {email:user.email, sub:user.id}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
