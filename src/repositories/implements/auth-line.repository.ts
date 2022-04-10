import {Injectable} from '@nestjs/common'
import {In, Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {BaseRepository} from './base.repository'
import {AuthLineEntity, MemberEntity} from '../../entities'
import {AuthLineSerializer} from '../../serializers'
import {AuthLineRepositoryInterface} from '../interfaces'

@Injectable()
export class AuthLineRepository
    extends BaseRepository<AuthLineEntity, AuthLineSerializer>
    implements AuthLineRepositoryInterface
{
    constructor(
        @InjectRepository(AuthLineEntity)
        private readonly authLineRepository: Repository<AuthLineEntity>,
    ) {
        super(authLineRepository)
    }
    async findByLineUserId(lineUserId: string) : Promise<AuthLineEntity> {
        return await this.authLineRepository.findOne({
            lineUserId
        })
    }
    async findByMember(member: MemberEntity) : Promise<AuthLineEntity> {
        return await this.authLineRepository.findOne({
            join: { alias: 'authLine', leftJoin: { user: 'authLine.user' } },
            where: qb => {
                qb.where('user.id = :userId', { userId: member.user }) // Filter related field
            }
        })
    }
    async findByMultiMember(members: MemberEntity[]) : Promise<AuthLineEntity[]> {
        return await this.authLineRepository.createQueryBuilder('authLine')
            .leftJoinAndSelect('members', 'members', 'authLine.user_id = members.user_id')
            .where('members.id IN(:...ids)', {ids: members.map(item => item.id)})
            .getMany()
    }
}
