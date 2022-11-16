/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param, ParseIntPipe, Patch, Delete } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    async getUser() {
        return await this.userService.getUser()
    }

    @Post()
    async addUser(@Body() createUser: CreateUserDto) {
        return await this.userService.addUser(createUser);
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        console.log(id, typeof id)
        return await this.userService.getUserById(id);
    }

    @Patch(":id")
    async updateUser(@Body() updUser: UpdateUserDto, @Param('id') id:string){
        return await this.userService.updateUser(updUser, id);
    }

    @Delete(":id")
    async deleteUser(@Param('id') id:string){
        return await this.userService.deleteUser(id);
    }
}
