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
    UserSerializer,
    UsersSerializer
} from '../serializers'
import {
    UserInterface
} from '../services/interfaces'
import {
    CreateUserInput,
    UpdateUserInput
} from './input'
import {
    Auth,
    ClientRole,
    User
} from '../common'
import {
    UserService
} from '../services/implements'

@Resolver(of => UserSerializer)
export class UserResolver {
    constructor(
        // @Inject('UserInterface')
        private readonly userService: UserService
    ) { }

    // @Query(returns => UsersSerializer, {
    //     name: 'roles',
    //     nullable: false
    // })
    // @Auth(MasterRole.ADMIN_MASTER, AdminRole.ADMIN_MANAGER)
    // async findAll(
    //     @Args('data') query: QueryUserInput
    // ) {
    //     return this.userService.findAll(query)
    // }
    //
    // @Query(returns => UserSerializer, {
    //     name: 'user',
    //     nullable: true
    // })
    // async findOne(
    //     @Args({ name: 'id', type: () => Int }) id: string
    // ) {
    //     return this.userService.findOne(id)
    // }

    @Query(returns => UserSerializer, {
        name: 'me',
        nullable: true
    })
    @Auth(ClientRole.USER_CLIENT)
    async findMe(
        @User('id') userId: string
    ) {
        return this.userService.findOne(userId)
    }

    @Mutation(() => UserSerializer, {
        name: 'createUser'
    })
    async createUser(
        @Args('data') input: CreateUserInput
    ): Promise<UserSerializer> {
        return this.userService.createUserByPhone(input)
    }
    //
    //
    // @Mutation(() => Boolean, { name: 'updateRole'})
    // async update(
    //     @Args({ name: 'id', type: () => Int }) id: string,
    //     @Args('data') input: UpdateUserInput
    // ): Promise<UserSerializer> {
    //     return this.userService.update(id, input)
    // }
}
