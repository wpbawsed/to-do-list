import {Repository} from 'typeorm'
import {classToPlain, plainToClass} from 'class-transformer'
import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {BaseRepository} from '.'
import {LineLoginConfigEntity} from '../../entities'
import {LineLoginConfigSerializer} from '../../serializers'
import {LineLoginConfigRepositoryInterface} from '../interfaces'

@Injectable()
export class LineLoginConfigRepository
    extends BaseRepository<LineLoginConfigEntity, LineLoginConfigSerializer>
    implements LineLoginConfigRepositoryInterface
{
    constructor(
        @InjectRepository(LineLoginConfigEntity)
        private readonly lineLoginConfigRepository: Repository<LineLoginConfigEntity>,
    ) {
        super(lineLoginConfigRepository)
    }
    transform(model: LineLoginConfigEntity): LineLoginConfigSerializer {
        return plainToClass(
            LineLoginConfigSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: LineLoginConfigEntity[]): LineLoginConfigSerializer[] {
        return models.map(model => this.transform(model))
    }

    async findByProject(project: string) : Promise<LineLoginConfigSerializer> {
        const lineConfig = await this.lineLoginConfigRepository.findOne({
            project
        })
        if (!lineConfig) {
            throw new NotFoundException({ message: 'Line Config not found' } )
        }
        return lineConfig
    }
}
