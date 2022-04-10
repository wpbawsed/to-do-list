import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立 Group 資訊'
})
export class CreateTodoGroupInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string
}
