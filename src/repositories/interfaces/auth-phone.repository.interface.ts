import {
    AuthPhoneEntity
} from '../../entities'
import {
    AuthPhoneSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface AuthPhoneRepositoryInterface
    extends BaseRepositoryInterface<AuthPhoneEntity, AuthPhoneSerializer> {
    findByPhone(phone: string) : Promise<AuthPhoneEntity>
}
