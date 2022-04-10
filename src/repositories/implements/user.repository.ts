import {
    Repository
} from 'typeorm'
import {
    InjectRepository
} from '@nestjs/typeorm'
import {
    Injectable
} from '@nestjs/common'
import {
    classToPlain,
    plainToClass
} from 'class-transformer'
import {
    BaseRepository
} from './base.repository'
import {
    UserEntity
} from '../../entities'
import {
    UserSerializer
} from '../../serializers'
import {
    UserRepositoryInterface
} from '../interfaces'

@Injectable()
export class UserRepository
    extends BaseRepository<UserEntity, UserSerializer>
    implements UserRepositoryInterface
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {
        super(usersRepository)
    }
    transform(model: UserEntity): UserSerializer {
        return plainToClass(
            UserSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: UserEntity[]): UserSerializer[] {
        return models.map(model => this.transform(model))
    }
}
