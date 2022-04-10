import {
    CreateTodoListInput,
    UpdateTodoListInput
} from '../../resolvers/input'
import {
    ToDoListSerializer
} from '../../serializers'

export interface ToDoListInterface {
    findAll(query): Promise<{count: number, list: ToDoListSerializer[]}>
    findOne(id: string): Promise<ToDoListSerializer>
    create(input: CreateTodoListInput): Promise<ToDoListSerializer>
    update(userId: string, input: UpdateTodoListInput): Promise<ToDoListSerializer>
    delete(id: string): Promise<any>
}
