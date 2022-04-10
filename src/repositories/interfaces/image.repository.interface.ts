import {
    ImageEntity
} from '../../entities'
import {
    ImageSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface ImageRepositoryInterface
    extends BaseRepositoryInterface<ImageEntity, ImageSerializer> {
}
