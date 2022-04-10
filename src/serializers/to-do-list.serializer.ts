import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer,
    MemberSerializer,
    ToDoGroupSerializer,
    ToDoItemSerializer
} from '.'

@ObjectType('ToDoList', {
    description: 'To Do List'
})
export class ToDoListSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => ToDoGroupSerializer, { nullable: false })
    group: ToDoGroupSerializer

    @Expose()
    @Field(() => MemberSerializer, { nullable: false })
    member: MemberSerializer

    @Expose()
    @Field(() => [ToDoItemSerializer], { nullable: false })
    items: ToDoItemSerializer
}
