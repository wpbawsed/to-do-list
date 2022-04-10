import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立 To Do List 資訊'
})
export class CreateTodoListInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string
}
