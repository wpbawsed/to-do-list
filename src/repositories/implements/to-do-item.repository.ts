import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {classToPlain, plainToClass} from 'class-transformer';
import {BaseRepository} from './base.repository';
import {ToDoItemEntity} from '../../entities';
import {ToDoItemSerializer} from '../../serializers';
import {ToDoItemRepositoryInterface} from '../interfaces';

@Injectable()
export class ToDoItemRepository
    extends BaseRepository<ToDoItemEntity, ToDoItemSerializer>
    implements ToDoItemRepositoryInterface
{
    constructor(
        @InjectRepository(ToDoItemEntity)
        private readonly todoItemRepository: Repository<ToDoItemEntity>,
    ) {
        super(todoItemRepository);
    }
    transform(model: ToDoItemEntity): ToDoItemSerializer {
        return plainToClass(
            ToDoItemSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        );
    }
    transformMany(models: ToDoItemEntity[]): ToDoItemSerializer[] {
        return models.map(model => this.transform(model));
    }
}
