/* eslint-disable prettier/prettier */
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://kaushikd:Kaushikd123@cluster0.1gty0ov.mongodb.net/users')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
