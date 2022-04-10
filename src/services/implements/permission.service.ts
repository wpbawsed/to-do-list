import {
    Inject,
    Injectable
} from '@nestjs/common'
import {
    BaseService
} from '.'
import {
    PermissionEntity
} from '../../entities'
import {
    CreatePermissionInput,
    UpdatePermissionInput
} from '../../resolvers/input'
import {
    PermissionInterface
} from '../interfaces'
import {
    PermissionSerializer
} from '../../serializers'
import {
    PermissionRepositoryInterface
} from '../../repositories/interfaces'

@Injectable()
export class PermissionService extends BaseService implements PermissionInterface{
    constructor(
        @Inject('PermissionRepositoryInterface')
        private readonly permissionRepository: PermissionRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: PermissionSerializer[]}> {
        return await this.permissionRepository.get({
            ...query,
        })
    }

    async findOne(id): Promise<PermissionSerializer> {
        return await this.permissionRepository.getOne(id)
    }

    async create(input: CreatePermissionInput): Promise<PermissionSerializer> {
        const newRole =  await this.permissionRepository.createEntity(new PermissionEntity({
            ...input
        }))
        return this.permissionRepository.transform(newRole)
    }

    async update(id: string, input: UpdatePermissionInput): Promise<any> {
        await this.permissionRepository.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.permissionRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
