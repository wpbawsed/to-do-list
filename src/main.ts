import {
  NestFactory
} from '@nestjs/core'
import {
  Logger
} from '@nestjs/common'
import * as helmet from 'helmet'
import * as dotenv from 'dotenv'
import {
  AppModule
} from './app.module'
import {
  ValidationPipe,
  LoggerMiddleware,
  TimeoutInterceptor,
  GlobalExceptionFilter
} from './common'

function getEnvironments() {
  dotenv.config()
  return process.env
}

async function bootstrap() {
  const { NODE_ENV, HOST, PORT } = getEnvironments()

  const app = await NestFactory.create(AppModule, {
    cors: {
      'origin': '*',
      'methods': 'GET,HEAD,PUT,POST',
      'preflightContinue': false,
      'credentials': true
    }
  })

  // security
  app.use(helmet({
    contentSecurityPolicy: NODE_ENV === 'production'
  }))

  // loggerMiddleware
  app.use(LoggerMiddleware)

  // interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor())

  // filter
  app.useGlobalFilters(new GlobalExceptionFilter())

  // pipe
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT!)
  Logger.log(`🚀  Server ready at https://${HOST!}:${PORT!}`, 'Bootstrap')
}

bootstrap()
