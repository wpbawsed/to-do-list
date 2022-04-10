import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer,
    RoleSerializer
} from '.'

@ObjectType('User', {
    description: 'User'
})
export class UserSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => Boolean, { nullable: false })
    block: boolean

    @Expose()
    @Field(() => RoleSerializer, { nullable: false })
    role: RoleSerializer
}

@ObjectType('Users', {
    description: 'Users'
})
export class UsersSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    count: string

    @Expose()
    @Field(() => [UserSerializer], { nullable: false })
    list: UserSerializer[]
}
