import {
  Module
} from '@nestjs/common'
import {
  HttpModule
} from '@nestjs/axios'
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config'
import {
  LineLoginApiService
} from '../../services/helper'
import {
  http
} from '../../config'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: http.getHttpConfig,
    }),
  ],
  providers: [
    LineLoginApiService
  ],
  exports: [
    LineLoginApiService
  ]
})
export class LineLoginApiFeaturesModule {
}
