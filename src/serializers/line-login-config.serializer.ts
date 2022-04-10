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

@ObjectType('LineLoginConfig', {
    description: 'Line Login Config'
})
export class LineLoginConfigSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => String, { nullable: false })
    channelId: string

    @Expose()
    @Field(() => String, { nullable: false })
    channelSecret: string

    @Expose()
    @Field(() => String, { nullable: false })
    linkLineOA: string
}
