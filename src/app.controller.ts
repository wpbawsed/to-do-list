import {
  Controller,
  Get,
} from '@nestjs/common'
import {
    AppService
} from './app.service'
import {
    SkipThrottle
} from '@nestjs/throttler'
import {
    HealthCheck,
    HealthCheckResult
} from '@nestjs/terminus'

@Controller()
@SkipThrottle()
export class AppController {
  constructor(
      private readonly appService: AppService
  ) {
  }

  @Get('version')
  getVersion(): string {
    return this.appService.getVersion()
  }

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.appService.getHealthCheck()
  }
}
