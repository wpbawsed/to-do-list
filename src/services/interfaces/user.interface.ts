import {
    CreateUserInput,
    UpdateUserInput
} from '../../resolvers/input'
import {
    UserSerializer
} from '../../serializers'
import {
    RoleEntity
} from '../../entities'

export interface UserInterface {
    findAll(query): Promise<{count: number, list: UserSerializer[]}>
    findOne(id): Promise<UserSerializer>
    createUserByPhone(input: CreateUserInput): Promise<UserSerializer>
    create(name: string, phone: string, password: string, role: RoleEntity): Promise<UserSerializer>
    update(id: string, input: UpdateUserInput): Promise<UserSerializer>
    delete(id: string): Promise<any>
}
