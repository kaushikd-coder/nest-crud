/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "./user.schema";
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    // injecting for using the model inside of the services
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async getUser() {
        const users = await this.userModel.find()
        return users.map(usr => ({
            id: usr._id,
            name: usr.name,
            email: usr.email,
            password: usr.password
        }))
    }

    async addUser(user: CreateUserDto){
        const newUser = new this.userModel(user);
        const result = await newUser.save();
        return result;
    }

    async getUserById(id: string) {
        const user = await this.userModel.findById(id);
        
        if(!user){
            return "Not Found";
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        }
        
    }
    
    async updateUser(upUsr: UpdateUserDto, id:string){
        const updateUser = await this.userModel.findByIdAndUpdate(id, upUsr);

        if(!updateUser){
            return "Not Found";
        }
    }

    async deleteUser(id:string){
        const deleteUser = await this.userModel.findByIdAndDelete(id);

        if(!deleteUser){
            return "Not Found";
        }
    }
}