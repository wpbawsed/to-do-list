import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立Role資訊'
})
export class CreateRoleInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string

    @IsNotEmpty()
    @Field({ nullable: false })
    description: string
}
