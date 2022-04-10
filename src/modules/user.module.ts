import {
    Module
} from '@nestjs/common'
import {
    TypeOrmModule
} from '@nestjs/typeorm'
import {
    RoleEntity,
    UserEntity
} from '../entities'
import {
    UserService
} from '../services/implements'
import {
    RoleRepository,
    UserRepository
} from '../repositories/implements'
import {
    UserResolver
} from '../resolvers'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            RoleEntity
        ])
    ],
    providers: [
        UserResolver,
        UserService, {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        }, {
            provide: 'RoleRepositoryInterface',
            useClass: RoleRepository,
        }
    ],
    exports: [
        UserService
    ],
})
export class UserModule {
}
