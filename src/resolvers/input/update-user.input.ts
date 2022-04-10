import {
    Field,
    InputType
} from '@nestjs/graphql'
import {
    AdminRole
} from '../../common'

@InputType()
export class UpdateUserInput {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    phone: string

    @Field(() => AdminRole, { nullable: true })
    role: AdminRole
}
