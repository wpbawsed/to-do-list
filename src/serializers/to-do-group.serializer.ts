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
    ToDoListSerializer
} from '.'

@ObjectType('ToDoGroup', {
    description: 'To Do Group'
})
export class ToDoGroupSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => MemberSerializer, { nullable: false })
    member: MemberSerializer

    @Expose()
    @Field(() => [ToDoListSerializer], { nullable: false })
    lists: ToDoListSerializer
}
