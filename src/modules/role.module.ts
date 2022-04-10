import {
    Module
} from '@nestjs/common'
import {
    TypeOrmModule
} from '@nestjs/typeorm'
import {
    RoleEntity
} from '../entities'
import {
    RoleService
} from '../services/implements'
import {
    RoleRepository
} from '../repositories/implements'
import {
    RoleResolver
} from '../resolvers'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity
        ])
    ],
    providers: [
        RoleResolver,
        RoleService, {
            provide: 'RoleRepositoryInterface',
            useClass: RoleRepository,
        }
    ],
    exports: [
        RoleService
    ],
})
export class RoleModule {
}
