import {
    Module
} from '@nestjs/common'
import {
    TypeOrmModule
} from '@nestjs/typeorm'
import {
    ConfigModule
} from '@nestjs/config'
import {
    LineLoginConfigEntity
} from '../entities'
import {
    LineLoginConfigService
} from '../services/implements'
import {
    LineLoginConfigRepository
} from '../repositories/implements'
import {
    LineLoginConfigResolver
} from '../resolvers'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([
            LineLoginConfigEntity
        ])
    ],
    providers: [
        LineLoginConfigResolver,
        LineLoginConfigService, {
            provide: 'LineLoginConfigRepositoryInterface',
            useClass: LineLoginConfigRepository,
        }
    ],
    exports: [
        LineLoginConfigService
    ],
})
export class LineLoginConfigModule {
}
