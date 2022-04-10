import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer
} from '.'

@ObjectType('Image', {
    description: 'Image'
})
export class ImageSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    type: string

    @Expose()
    @Field(() => String, { nullable: false })
    filename: string
}
