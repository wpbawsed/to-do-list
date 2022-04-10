import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer
} from '.'
import {
    ToDoRepeatUnit
} from '../common'

@ObjectType('ToDoItem', {
    description: 'To Do Item'
})
export class ToDoItemSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => Boolean, { nullable: false })
    completed: boolean

    @Expose()
    @Field(() => [String], { nullable: true })
    steps: object

    @Expose()
    @Field(() => Boolean, { nullable: true })
    favorite: boolean

    @Expose()
    @Field(() => Boolean, { nullable: true })
    oneDay: boolean

    @Expose()
    @Field(() => Boolean, { nullable: true })
    remind: boolean

    @Expose()
    @Field(() => Date, { nullable: true })
    deadline: Date

    @Expose()
    @Field(() => Number, { nullable: true })
    repeatNum: number

    @Expose()
    @Field(() => ToDoRepeatUnit, { nullable: true })
    repeatUnit: ToDoRepeatUnit

    @Expose()
    @Field(() => String, { nullable: false })
    remark: string
}
