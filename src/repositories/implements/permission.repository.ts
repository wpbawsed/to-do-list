import {Repository} from 'typeorm';
import {classToPlain, plainToClass} from 'class-transformer';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '.';
import {PermissionEntity} from '../../entities';
import {PermissionSerializer} from '../../serializers';
import {PermissionRepositoryInterface} from '../interfaces';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity, PermissionSerializer> implements PermissionRepositoryInterface{
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ) {
        super(permissionRepository);
    }
    transform(model: PermissionEntity): PermissionSerializer {
        return plainToClass(
            PermissionSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        );
    }
    transformMany(models: PermissionEntity[]): PermissionSerializer[] {
        return models.map(model => this.transform(model));
    }
}
