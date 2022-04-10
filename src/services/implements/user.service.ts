import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import {
    getManager,
    In
} from 'typeorm'
import {
    BaseService,
    FindType
} from '.'
import {
    AuthPhoneEntity,
    MemberEntity,
    RoleEntity,
    UserEntity
} from '../../entities'
import {
    CreateUserInput,
    UpdateUserInput
} from '../../resolvers/input'
import {
    UserSerializer
} from '../../serializers'
import {
    UserInterface
} from '../interfaces'
import {
    AdminRole,
    ClientRole
} from '../../common'
import {
    RoleRepositoryInterface,
    UserRepositoryInterface
} from '../../repositories/interfaces'

import * as argon2 from 'argon2';

@Injectable()
export class UserService extends BaseService implements UserInterface{
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
        @Inject('RoleRepositoryInterface')
        private readonly rolesRepository: RoleRepositoryInterface
    ) {
        super()
    }

    async findAll(query): Promise<{count: number, list: UserSerializer[]}> {
        const list = await this.rolesRepository.findByRole(AdminRole.ADMIN_MANAGER, AdminRole.ADMIN_STAFF)
        const where = this.findOption(
            query,
            ['name', FindType.LIKE])
        return await this.userRepository.get({
            ...query,
            where: {
                ...where,
                role: In(list.map(r => r.id))
            }
        })
    }

    async findOne(id): Promise<UserSerializer> {
        const user = await this.userRepository.getOne(id)
        return this.userRepository.transform(user)
    }

    async checkRoleExist(role: string) {
        const roleRepository = await this.rolesRepository.findByName(role)
        if (!roleRepository) {
            throw new NotFoundException({message: 'role name not found'})
        }
        return roleRepository
    }

    async checkCreateData(input: CreateUserInput) {
        const { name, phone, confirmPassword, password } = input
        if ( password !== confirmPassword) {
            throw new BadRequestException({message: 'password is not match'});
        }
        // ---- 檢查是否存在
        // const authEmail = await this.authEmailRepository.findByEmail(email)
        // if (authEmail) {
        //     throw new ConflictException({message: 'email is already exist'})
        // }
        return {
            name,
            phone,
            password,
        }
    }
    async checkUpdateData(id: string, role: string) {
        // ---- 檢查是否存在
        const userRepository = await this.userRepository.getOne(id)
        if (!userRepository) {
            throw new NotFoundException({message: 'user not found'})
        }
        const roleName = role ? role : userRepository.role.name
        const roleRepository = await this.checkRoleExist(roleName)
        return {
            userRepository,
            roleRepository
        }
    }

    async createUserByPhone(input: CreateUserInput): Promise<UserSerializer> {
        const {name, phone, password} = await this.checkCreateData(input)
        const role = await this.checkRoleExist(ClientRole.USER_CLIENT)
        return await this.create(name, phone, password, role)
    }

    async create(name: string, phone: string, password: string, role: RoleEntity): Promise<UserSerializer> {
        const newUser = await getManager().transaction( async manager => {
            // ---- create user
            const user = await manager.save(UserEntity, {
                name,
                role
            })
            // ---- create member
            await manager.save(MemberEntity, {
                name,
                phone,
                user
            })

            // ---- create auth phone
            await manager.save(AuthPhoneEntity, {
                phone,
                password: await argon2.hash(password),
                user
            })
            return user
        })

        return this.userRepository.transform(newUser)
    }

    async update(id: string, input: UpdateUserInput): Promise<any> {
        const { name, role } = input
        const { userRepository, roleRepository } = await this.checkUpdateData(id, role)
        await this.userRepository.updateEntity(id, {
            name: name ? name : userRepository.name,
            role: roleRepository
        })
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.userRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }
}
