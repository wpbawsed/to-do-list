import {
    Module
} from '@nestjs/common'
import {
    TypeOrmModule
} from '@nestjs/typeorm'
import {
    ImageEntity
} from '../entities'
import {
    ImageService
} from '../services/implements'
import {
    ImageRepository
} from '../repositories/implements'
import {
    UploadImageFeaturesModule
} from './features'
import {
    ImageResolver
} from '../resolvers'

@Module({
    imports: [
        UploadImageFeaturesModule,
        TypeOrmModule.forFeature([
            ImageEntity
        ])
    ],
    providers: [
        ImageResolver,
        ImageService, {
            provide: 'ImageRepositoryInterface',
            useClass: ImageRepository,
        }
    ],
    exports: [
        ImageService
    ],
})
export class ImageModule {
}
