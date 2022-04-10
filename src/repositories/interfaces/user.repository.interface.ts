import {
    BaseRepositoryInterface
} from '.'
import {
    UserEntity
} from '../../entities'
import {
    UserSerializer
} from '../../serializers'

export interface UserRepositoryInterface
    extends BaseRepositoryInterface<UserEntity, UserSerializer> {
}
