import {Repository} from 'typeorm'
import {classToPlain, plainToClass} from 'class-transformer'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {BaseRepository} from '.'
import {ImageEntity} from '../../entities'
import {ImageSerializer} from '../../serializers'
import {ImageRepositoryInterface} from '../interfaces'

@Injectable()
export class ImageRepository extends BaseRepository<ImageEntity, ImageSerializer> implements ImageRepositoryInterface{
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
    ) {
        super(imageRepository)
    }
    transform(model: ImageEntity): ImageSerializer {
        return plainToClass(
            ImageSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: ImageEntity[]): ImageSerializer[] {
        return models.map(model => this.transform(model))
    }
}
