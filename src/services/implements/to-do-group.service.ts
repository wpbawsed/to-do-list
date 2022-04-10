import {
    Injectable,
    Inject,
} from '@nestjs/common'
import {
    BaseService
} from '.'
import {
    ToDoGroupEntity
} from '../../entities'
import {
    CreateTodoGroupInput,
    UpdateTodoGroupInput
} from '../../resolvers/input'
import {
    ToDoGroupInterface
} from '../interfaces'
import {
    ToDoGroupSerializer
} from '../../serializers'
import {
    ToDoGroupRepositoryInterface
} from '../../repositories/interfaces'

const randomstring = require('randomstring')

@Injectable()
export class ToDoGroupService extends BaseService implements ToDoGroupInterface{
    constructor(
        @Inject('ToDoGroupRepositoryInterface')
        private readonly toDoGroupRepositoryInterface: ToDoGroupRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: ToDoGroupSerializer[]}> {
        return await this.toDoGroupRepositoryInterface.get({
            ...query,
        })
    }

    async findOne(id): Promise<ToDoGroupSerializer> {
        return this.toDoGroupRepositoryInterface.transform(
            await this.toDoGroupRepositoryInterface.getOne(id)
        )
    }

    async create(input: CreateTodoGroupInput): Promise<ToDoGroupSerializer> {
        const { name } = input
        const todoGroup = await this.toDoGroupRepositoryInterface.findByName(name)
        const newTodoGroup =  await this.toDoGroupRepositoryInterface.createEntity(new ToDoGroupEntity({
            name: `${name}${todoGroup ? randomstring.generate({
                length: 6,
                charset: 'alphanumeric'
            }) : ''}`
        }))
        return this.toDoGroupRepositoryInterface.transform(newTodoGroup)
    }

    async update(id: string, input: UpdateTodoGroupInput): Promise<any> {
        await this.toDoGroupRepositoryInterface.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.toDoGroupRepositoryInterface.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
