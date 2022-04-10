import {Repository} from 'typeorm'
import {classToPlain, plainToClass} from 'class-transformer'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {BaseRepository} from './base.repository'
import {MemberEntity} from '../../entities'
import {MemberSerializer} from '../../serializers'
import {MemberRepositoryInterface} from '../interfaces'


@Injectable()
export class MemberRepository
    extends BaseRepository<MemberEntity, MemberSerializer>
    implements MemberRepositoryInterface
{
    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,
    ) {
        super(memberRepository)
    }
    transform(model: MemberEntity): MemberSerializer {
        return plainToClass(
            MemberSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: MemberEntity[]): MemberSerializer[] {
        return models.map(model => this.transform(model))
    }
    async findByUser(userId: string) : Promise<MemberEntity> {
        return await this.memberRepository.findOne({
            where: {
                user: userId
            }
        })
    }
}
