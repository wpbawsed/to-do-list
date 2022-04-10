import {
    CreateTodoGroupInput,
    UpdateTodoGroupInput
} from '../../resolvers/input'
import {
    ToDoGroupSerializer
} from '../../serializers'

export interface ToDoGroupInterface {
    findAll(query): Promise<{count: number, list: ToDoGroupSerializer[]}>
    findOne(id: string): Promise<ToDoGroupSerializer>
    create(input: CreateTodoGroupInput): Promise<ToDoGroupSerializer>
    update(userId: string, input: UpdateTodoGroupInput): Promise<ToDoGroupSerializer>
    delete(id: string): Promise<any>
}
