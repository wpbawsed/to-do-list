import {
    ImageSerializer
} from '../../serializers'

export interface ImageInterface {
    upload(userId: string, image): Promise<ImageSerializer>
}
