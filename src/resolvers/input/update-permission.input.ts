import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '更新Permission資訊'
})
export class UpdatePermissionInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    controller: string

    @IsNotEmpty()
    @Field({ nullable: false })
    action: string
}
