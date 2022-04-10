import {
    Injectable,
    Inject,
    ConflictException
} from '@nestjs/common'
import {
    BaseService
} from '.'
import {
    RoleEntity
} from '../../entities'
import {
    CreateRoleInput,
    UpdateRoleInput
} from '../../resolvers/input'
import {
    RoleInterface
} from '../interfaces'
import {
    RoleSerializer
} from '../../serializers'
import {
    RoleRepositoryInterface
} from '../../repositories/interfaces'

@Injectable()
export class RoleService extends BaseService implements RoleInterface{
    constructor(
        @Inject('RoleRepositoryInterface')
        private readonly rolesRepository: RoleRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: RoleSerializer[]}> {
        return await this.rolesRepository.get({
            ...query,
        })
    }

    async findOne(id): Promise<RoleSerializer> {
        return await this.rolesRepository.getOne(id)
    }

    async create(input: CreateRoleInput): Promise<RoleSerializer> {
        // Role Name 唯一
        const { name, description } = input

        const role = await this.rolesRepository.findByName(name)

        if(role) {
            throw new ConflictException('role already exists')
        }
        const newRole =  await this.rolesRepository.createEntity(new RoleEntity({
            name,
            description
        }))
        return this.rolesRepository.transform(newRole)
    }

    async update(id: string, input: UpdateRoleInput): Promise<any> {
        await this.rolesRepository.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.rolesRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
