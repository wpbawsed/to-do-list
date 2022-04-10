import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { AppController } from '../src/app.controller'
import { AppService } from '../src/app.service'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeorm } from '../src/config'
import {INestApplication} from '@nestjs/common'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // ---- HealthCheck
        TerminusModule,
        // ---- Database
        TypeOrmModule.forRoot(typeorm.getTypeOrmConfig()),
        AppModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    const res: request.Response = await request(app.getHttpServer()).get('/')
    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('ok')
  })

  it('/version (GET)', async () => {
    const res: request.Response = await request(app.getHttpServer()).get('/version')
    expect(res.status).toEqual(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
