import {
    Injectable,
    Inject,
} from '@nestjs/common'
import {
    BaseService
} from '.'
import {
    ToDoListEntity
} from '../../entities'
import {
    CreateTodoListInput,
    UpdateTodoListInput
} from '../../resolvers/input'
import {
    ToDoListInterface
} from '../interfaces'
import {
    ToDoListSerializer
} from '../../serializers'
import {
    ToDoListRepositoryInterface
} from '../../repositories/interfaces'
const randomstring = require('randomstring')

@Injectable()
export class ToDoListService extends BaseService implements ToDoListInterface{
    constructor(
        @Inject('ToDoListRepositoryInterface')
        private readonly toDoListRepository: ToDoListRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: ToDoListSerializer[]}> {
        return await this.toDoListRepository.get({
            ...query,
        })
    }

    async findOne(id): Promise<ToDoListSerializer> {
        return this.toDoListRepository.transform(
            await this.toDoListRepository.getOne(id)
        )
    }

    async create(input: CreateTodoListInput): Promise<ToDoListSerializer> {
        const { name } = input
        const toDoList = await this.toDoListRepository.findByName(name)
        const newRole =  await this.toDoListRepository.createEntity(new ToDoListEntity({
            name: `${name}${toDoList ? randomstring.generate({
                length: 6,
                charset: 'alphanumeric'
            }) : ''}`
        }))
        return this.toDoListRepository.transform(newRole)
    }

    async update(id: string, input: UpdateTodoListInput): Promise<any> {
        await this.toDoListRepository.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.toDoListRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
