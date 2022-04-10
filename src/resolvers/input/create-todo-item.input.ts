import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立 To Do Item 資訊'
})
export class CreateTodoItemInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string
}
