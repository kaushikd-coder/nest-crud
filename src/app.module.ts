/* eslint-disable prettier/prettier */
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule,DatabaseModule,ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
