import {
    CreateRoleInput,
    UpdateRoleInput
} from '../../resolvers/input'
import {
    RoleSerializer
} from '../../serializers'

export interface RoleInterface {
    findAll(query): Promise<{count: number, list: RoleSerializer[]}>
    findOne(id): Promise<RoleSerializer>
    create(input: CreateRoleInput): Promise<RoleSerializer>
    update(id: string, input: UpdateRoleInput): Promise<RoleSerializer>
    delete(id: string): Promise<any>
}
