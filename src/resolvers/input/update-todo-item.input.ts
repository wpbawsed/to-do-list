import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'
import {
    GraphQLJSONObject
} from 'graphql-type-json'
import {
    ToDoRepeatUnit
} from '../../common'

@InputType({
    description: '更新 To Do Item 資訊'
})
export class UpdateTodoItemInput {
    @IsNotEmpty()
    @Field({
        nullable: false
    })
    name: string

    @Field({
        nullable: true
    })
    completed: boolean

    @Field(() => GraphQLJSONObject, {
        nullable: true
    })
    steps: object

    @Field({ nullable: true })
    favorite: boolean

    @Field({ nullable: true })
    oneDay: boolean

    @Field({ nullable: true })
    remind: boolean

    @Field({ nullable: true })
    deadline: string

    @Field({ nullable: true })
    repeatNum: number

    @Field(() => ToDoRepeatUnit, {
        nullable: true
    })
    repeatUnit: ToDoRepeatUnit

    @Field({ nullable: true })
    remark: string

    @Field({ nullable: true })
    listId: string
}
