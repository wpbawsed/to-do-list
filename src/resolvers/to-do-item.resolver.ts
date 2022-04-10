import {
    Int,
    Args,
    Query,
    Mutation,
    Resolver
} from '@nestjs/graphql'
import {
    Inject,
    UseGuards
} from '@nestjs/common'
import {
    AuthGuard
} from '@nestjs/passport'
import {
    RoleSerializer,
    RolesSerializer
} from '../serializers'
import {
    RoleInterface
} from '../services/interfaces'
import {
    CreateRoleInput,
    QueryRoleInput,
    UpdateRoleInput
} from './input'
import {
    Auth,
    ClientRole
} from '../common'

@Resolver(of => RoleSerializer)
@Auth(ClientRole.USER_CLIENT)
export class RoleResolver {
    constructor(
        @Inject('RoleInterface')
        private readonly roleService: RoleInterface
    ) { }

    @Query(returns => RolesSerializer, {
        name: 'roles',
        nullable: false
    })
    async findAll(
        @Args('data') query: QueryRoleInput
    ) {
        return this.roleService.findAll(query)
    }

    @Query(returns => RoleSerializer, {
        name: 'role',
        nullable: true
    })
    async findOne(
        @Args({ name: 'id', type: () => Int }) id: string
    ) {
        return this.roleService.findOne(id)
    }

    @Mutation(() => RoleSerializer, { name: 'createRole'})
    async create(
        @Args('data') input: CreateRoleInput
    ): Promise<RoleSerializer> {
        return this.roleService.create(input)
    }

    @Mutation(() => Boolean, { name: 'updateRole'})
    async update(
        @Args({ name: 'id', type: () => Int }) id: string,
        @Args('data') input: UpdateRoleInput
    ): Promise<RoleSerializer> {
        return this.roleService.update(id, input)
    }
}
