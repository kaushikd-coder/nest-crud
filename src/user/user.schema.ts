/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose'


// Create a schema for the user
export const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    }
})

export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
}