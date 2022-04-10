import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '更新Role資訊'
})
export class UpdateRoleInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    description: string
}
