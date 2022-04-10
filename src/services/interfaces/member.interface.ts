import {
    CreateMemberInput,
    UpdateMemberInput
} from '../../resolvers/input'
import {
    MemberSerializer
} from '../../serializers'

export interface MemberInterface {
    findAll(query): Promise<{count: number, list: MemberSerializer[]}>
    findOne(id: string): Promise<MemberSerializer>
    findMe(userId: string): Promise<MemberSerializer>
    create(input: CreateMemberInput): Promise<MemberSerializer>
    update(userId: string, input: UpdateMemberInput): Promise<MemberSerializer>
    delete(id: string): Promise<any>
}
