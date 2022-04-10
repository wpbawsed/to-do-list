import {
    CreatePermissionInput,
    UpdatePermissionInput
} from '../../resolvers/input'
import {
    PermissionSerializer
} from '../../serializers'

export interface PermissionInterface {
    findAll(query): Promise<{count: number, list: PermissionSerializer[]}>
    findOne(id): Promise<PermissionSerializer>
    create(input: CreatePermissionInput): Promise<PermissionSerializer>
    update(id: string, input: UpdatePermissionInput): Promise<any>
    delete(id): Promise<any>
}
