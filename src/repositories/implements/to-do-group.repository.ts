import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Injectable} from '@nestjs/common'
import {classToPlain, plainToClass} from 'class-transformer'
import {BaseRepository} from './base.repository'
import {ToDoGroupEntity} from '../../entities'
import {ToDoGroupSerializer} from '../../serializers'
import {ToDoGroupRepositoryInterface} from '../interfaces'

@Injectable()
export class ToDoGroupRepository
    extends BaseRepository<ToDoGroupEntity, ToDoGroupSerializer>
    implements ToDoGroupRepositoryInterface
{
    constructor(
        @InjectRepository(ToDoGroupEntity)
        private readonly todoGroupRepository: Repository<ToDoGroupEntity>,
    ) {
        super(todoGroupRepository)
    }
    transform(model: ToDoGroupEntity): ToDoGroupSerializer {
        return plainToClass(
            ToDoGroupSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: ToDoGroupEntity[]): ToDoGroupSerializer[] {
        return models.map(model => this.transform(model))
    }
    async findByName(name: string) : Promise<ToDoGroupEntity> {
        return await this.todoGroupRepository.findOne({
            name
        })
    }
}
