import {
    Injectable,
    Inject,
} from '@nestjs/common'
import {
    BaseService
} from '.'
import {
    ToDoItemEntity
} from '../../entities'
import {
    CreateTodoItemInput,
    UpdateTodoItemInput
} from '../../resolvers/input'
import {
    ToDoItemInterface
} from '../interfaces'
import {
    ToDoItemSerializer
} from '../../serializers'
import {
    ToDoItemRepositoryInterface
} from '../../repositories/interfaces'

@Injectable()
export class ToDoItemService extends BaseService implements ToDoItemInterface{
    constructor(
        @Inject('ToDoItemRepositoryInterface')
        private readonly todoItemRepository: ToDoItemRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: ToDoItemSerializer[]}> {
        return await this.todoItemRepository.get({
            ...query,
        })
    }

    async findOne(id): Promise<ToDoItemSerializer> {
        return await this.todoItemRepository.getOne(id)
    }

    async create(input: CreateTodoItemInput): Promise<ToDoItemSerializer> {
        const { name } = input

        const newRole =  await this.todoItemRepository.createEntity(new ToDoItemEntity({
            name,
        }))
        return this.todoItemRepository.transform(newRole)
    }

    async update(id: string, input: UpdateTodoItemInput): Promise<any> {
        await this.todoItemRepository.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.todoItemRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
