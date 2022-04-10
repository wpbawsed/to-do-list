import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer,
    ImageSerializer,
    UserSerializer
} from '.'

@ObjectType('Member', {
    description: 'Member'
})
export class MemberSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => String, { nullable: false })
    phone: string

    @Expose()
    @Field(() => ImageSerializer, { nullable: false })
    avatar: ImageSerializer

    @Expose()
    @Field(() => UserSerializer, { nullable: false })
    user: UserSerializer
}

@ObjectType('Members', {
    description: 'Member'
})
export class MembersSerializer {
    @Expose()
    @Field(() => String, { nullable: false })
    count: string

    @Expose()
    @Field(() => [MemberSerializer], { nullable: false })
    list: MemberSerializer[]
}
