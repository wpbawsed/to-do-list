import {
    Inject,
    Injectable
} from '@nestjs/common'
import {
    ImageSerializer
} from '../../serializers'
import {
    BaseService
} from '.'
import {
    ImageInterface
} from '../interfaces'
import {
    UploadImageService
} from '../helper'
import {
    ImageEntity
} from '../../entities'
import {
    ImageRepositoryInterface,
    UserRepositoryInterface
} from '../../repositories/interfaces'

@Injectable()
export class ImageService extends BaseService implements ImageInterface{
    constructor(
        @Inject('ImageRepositoryInterface')
        private readonly imageRepository: ImageRepositoryInterface,
        // @Inject('UserRepositoryInterface')
        // private readonly usersRepository: UserRepositoryInterface,
        private readonly uploadImageService: UploadImageService
    ) {
        super()
    }
    async upload(userId: string, file): Promise<ImageSerializer> {
        // const user = await this.usersRepository.getOne(userId)

        const { filename } = await this.uploadImageService.upload(file)
        const { mimetype } = file
        // ---- upload to storage
        const newImage = await this.imageRepository.createEntity(new ImageEntity({
            type: 's3',
            filename,
            mimetype,
            // user
        }))
        return this.imageRepository.transform(newImage)
    }
}
