import {In, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {classToPlain, plainToClass} from 'class-transformer';
import {BaseRepository} from './base.repository';
import {RoleEntity} from '../../entities';
import {RoleSerializer} from '../../serializers';
import {RoleRepositoryInterface} from '../interfaces';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity, RoleSerializer> implements RoleRepositoryInterface{
    constructor(
        @InjectRepository(RoleEntity)
        private readonly rolesRepository: Repository<RoleEntity>,
    ) {
        super(rolesRepository);
    }
    transform(model: RoleEntity): RoleSerializer {
        return plainToClass(
            RoleSerializer,
            classToPlain(model),
            { excludeExtraneousValues: true }
        );
    }
    transformMany(models: RoleEntity[]): RoleSerializer[] {
        return models.map(model => this.transform(model));
    }
    async findByName(name: string) : Promise<RoleEntity> {
        return await this.rolesRepository.findOne({
            name
        })
    }
    async findByRole(...role: string[]) : Promise<RoleEntity[]> {
        return await this.rolesRepository.find({
            where: {
                name: In(role)
            }
        })
    }
}
