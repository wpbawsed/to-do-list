import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    Expose
} from 'class-transformer'
import {
    BaseSerializer,
    UserSerializer
} from '.'

@ObjectType('AuthPhone', {
    description: 'Auth Phone'
})
export class AuthPhoneSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    phone: string

    @Expose()
    @Field(() => String, { nullable: false })
    password: string

    @Expose()
    @Field(() => UserSerializer, { nullable: false })
    user: UserSerializer
}
