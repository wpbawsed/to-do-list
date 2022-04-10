import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Injectable} from '@nestjs/common'
import {classToPlain, plainToClass} from 'class-transformer'
import {BaseRepository} from './base.repository'
import {ToDoListEntity} from '../../entities'
import {ToDoListSerializer} from '../../serializers'
import {ToDoListRepositoryInterface} from '../interfaces'

@Injectable()
export class ToDoListRepository
    extends BaseRepository<ToDoListEntity, ToDoListSerializer>
    implements ToDoListRepositoryInterface
{
    constructor(
        @InjectRepository(ToDoListEntity)
        private readonly todoListRepository: Repository<ToDoListEntity>,
    ) {
        super(todoListRepository)
    }
    transform(model: ToDoListEntity): ToDoListSerializer {
        return plainToClass(
            ToDoListSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        )
    }
    transformMany(models: ToDoListEntity[]): ToDoListSerializer[] {
        return models.map(model => this.transform(model))
    }
    async findByName(name: string) : Promise<ToDoListEntity> {
        return await this.todoListRepository.findOne({
            name
        })
    }
}
