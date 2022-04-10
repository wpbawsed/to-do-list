import {
    ObjectType,
    Field
} from '@nestjs/graphql'
import {
    Expose
} from 'class-transformer'
import {
    BaseSerializer,
    UserSerializer
} from '.'

@ObjectType('AuthLine', {
    description: 'Auth Line'
})
export class AuthLineSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    lineToken: string

    @Expose()
    @Field(() => UserSerializer, { nullable: false })
    user: UserSerializer
}
