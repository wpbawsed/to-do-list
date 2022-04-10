import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '更新 Group 資訊'
})
export class UpdateTodoGroupInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string
}
