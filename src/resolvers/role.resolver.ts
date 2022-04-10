import {
    ID,
    Args,
    Query,
    Mutation,
    Resolver,
} from '@nestjs/graphql'
import {
    UseGuards
} from '@nestjs/common'
import {
    RoleSerializer,
    RolesSerializer
} from '../serializers'
import {
    CreateRoleInput,
    QueryRoleInput,
    UpdateRoleInput
} from './input'
import {
    RoleService
} from '../services/implements'
import {
    GqlApiKeyAuthGuard
} from '../common'

@Resolver(of => RoleSerializer)
@UseGuards(GqlApiKeyAuthGuard)
export class RoleResolver {
    constructor(
        // @Inject('RoleInterface')
        private readonly roleService: RoleService
    ) { }

    @Query(returns => RolesSerializer, {
        name: 'roles',
        nullable: false
    })
    async findAll(
        @Args({
            type: () => QueryRoleInput
        }) query: QueryRoleInput
    ) {
        return this.roleService.findAll(query)
    }

    @Query(returns => RoleSerializer, {
        name: 'role',
        nullable: true
    })
    async findOne(
        @Args({ name: 'id', type: () => ID }) id: string
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
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('data') input: UpdateRoleInput
    ): Promise<RoleSerializer> {
        return this.roleService.update(id, input)
    }
}
