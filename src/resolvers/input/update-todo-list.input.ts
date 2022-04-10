import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '更新 To Do List 資訊'
})
export class UpdateTodoListInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string
}
