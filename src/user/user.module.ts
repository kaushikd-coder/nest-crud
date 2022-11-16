/* eslint-disable prettier/prettier */
import { userSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from './user.service';


@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: userSchema}])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}