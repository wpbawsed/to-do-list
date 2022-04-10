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
  UploadImageService
} from '../../services/helper'
import {
  http
} from '../../config'

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: http.getHttpConfig,
    }),
  ],
  providers: [
    UploadImageService
  ],
  exports: [
    UploadImageService
  ]
})
export class UploadImageFeaturesModule {
}
