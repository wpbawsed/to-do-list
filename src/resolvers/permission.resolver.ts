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
    PermissionSerializer,
    PermissionsSerializer
} from '../serializers'
import {
    PermissionInterface
} from '../services/interfaces'
import {
    CreatePermissionInput,
    QueryPermissionInput,
    UpdatePermissionInput
} from './input'
import {
    GqlApiKeyAuthGuard
} from '../common'

@Resolver(of => PermissionSerializer)
@UseGuards(GqlApiKeyAuthGuard)
export class PermissionResolver {
    constructor(
        @Inject('PermissionInterface')
        private readonly permissionService: PermissionInterface
    ) { }

    @Query(returns => PermissionsSerializer, {
        name: 'roles',
        nullable: false
    })
    async findAll(
        @Args('data') query: QueryPermissionInput
    ) {
        return this.permissionService.findAll(query)
    }

    @Query(returns => PermissionSerializer, {
        name: 'role',
        nullable: true
    })
    async findOne(
        @Args({ name: 'id', type: () => Int }) id: string
    ) {
        return this.permissionService.findOne(id)
    }

    @Mutation(() => PermissionSerializer, {
        name: 'createPermission'
    })
    async create(
        @Args('data') input: CreatePermissionInput
    ): Promise<PermissionSerializer> {
        return this.permissionService.create(input)
    }

    @Mutation(() => Boolean, {
        name: 'updatePermission'
    })
    async update(
        @Args({ name: 'id', type: () => Int }) id: string,
        @Args('data') input: UpdatePermissionInput
    ): Promise<PermissionSerializer> {
        return this.permissionService.update(id, input)
    }
}
