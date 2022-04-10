import {
    CreateTodoItemInput,
    UpdateTodoItemInput
} from '../../resolvers/input'
import {
    ToDoItemSerializer
} from '../../serializers'

export interface ToDoItemInterface {
    findAll(query): Promise<{count: number, list: ToDoItemSerializer[]}>
    findOne(id: string): Promise<ToDoItemSerializer>
    create(input: CreateTodoItemInput): Promise<ToDoItemSerializer>
    update(userId: string, input: UpdateTodoItemInput): Promise<ToDoItemSerializer>
    delete(id: string): Promise<any>
}
