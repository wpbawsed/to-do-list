import {
    AuthLineEntity,
    MemberEntity
} from '../../entities'
import {
    AuthLineSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface AuthLineRepositoryInterface
    extends BaseRepositoryInterface<AuthLineEntity, AuthLineSerializer> {
    findByLineUserId(lineUserId: string) : Promise<AuthLineEntity>
    findByMember(member: MemberEntity) : Promise<AuthLineEntity>
    findByMultiMember(members: MemberEntity[]) : Promise<AuthLineEntity[]>
}
