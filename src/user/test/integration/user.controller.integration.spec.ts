/* eslint-disable prettier/prettier */
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import { AppModule } from "../../../app.module"
import { userStub } from '../stubs/user.stub';
import { DatabaseService } from './../../../database/database.service';
import * as request from 'supertest'
import { CreateUserDto } from "src/user/dto/user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";


describe('UserController', () => {

    let dbConnection: Connection;
    let httpServer:any;
    let app:any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
        httpServer = app.getHttpServer();
    })

    afterAll(async () => {
      await app.close();
    })
  
    beforeEach(async () => {
      await dbConnection.collection('users').deleteMany({});
    })

 
    describe('getUser', () => {
        it('should return an users', async () => {
          await dbConnection.collection('users').insertOne(userStub())
          const response = await request(httpServer).get('/user');
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual([userStub()]);
        })
      })

      describe('createUser', () => {
        it('should create a user', async () => {
          const createUserRequest: CreateUserDto = {
            email: userStub().email,
            name: userStub().name,
            password: userStub().password,
          }
          const response = await request(httpServer).post('/user').send(createUserRequest)
    
          expect(response.status).toBe(201);
          expect(response.body).toMatchObject(createUserRequest);
    
          const user = await dbConnection.collection('users').findOne({ email: createUserRequest.email });
          expect(user).toMatchObject(createUserRequest);
        })

        
      })

      describe('updateUser', () => {
        it('should update a user', async () => {
          const updateUserRequest: UpdateUserDto = {
            name: userStub().name,
          }
          const response = await request(httpServer).patch('/user/123').send(updateUserRequest)

          // expect(response.status).toBe(200);
          // expect(response.body).toMatchObject(updateUserRequest);


          await dbConnection.collection('users').insertOne({name:response.body});
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject(updateUserRequest);
          // const user = await dbConnection.collection('users').findOne({ name:response.body.name});
          // expect(user).toMatchObject(updateUserRequest);
        })
      })

      // describe('deleteUser', () => {
      //   it('should delete a user', async () => {
        
      //     const response = await request(httpServer).delete('/user/123')
    
      //     expect(response.status).toBe(200);
      //     expect(response.body).toMatchObject({message: 'User deleted'});
      //   })
          
      // })

      describe('getUserById', () => {
        it('should return a user', async () => {
          const res = {...userStub()}
          await dbConnection.collection('users').insertOne(res)
          const response = await request(httpServer).get('/user/123');

          expect(response.status).toBe(200);
          expect(response.body).toMatchObject(res);
        })
      })
    
})






