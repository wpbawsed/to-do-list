import {
    MemberEntity
} from '../../entities'
import {
    MemberSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface MemberRepositoryInterface
    extends BaseRepositoryInterface<MemberEntity, MemberSerializer> {
    findByUser(userId: string) : Promise<MemberEntity>
}
