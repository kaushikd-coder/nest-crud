/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}