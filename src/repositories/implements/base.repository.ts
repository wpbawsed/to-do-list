import {plainToClass} from 'class-transformer'
import {Repository, DeepPartial} from 'typeorm'
import {HttpStatus, NotFoundException} from '@nestjs/common'
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity'
import {validate} from 'class-validator'
import {HttpException} from '@nestjs/common/exceptions/http.exception'
import {BaseSerializer} from '../../serializers'
import {BaseEntity} from '../../entities'
import {BaseRepositoryInterface} from '../interfaces'

export abstract class BaseRepository<T extends BaseEntity, K extends BaseSerializer> implements BaseRepositoryInterface<T, K> {
    private entity: Repository<T>

    protected constructor(entity: Repository<T>) {
        this.entity = entity
    }

    async get(query): Promise<{count: number, list: K[]}> {
        const { where, relations, order, start, limit } = query
        const [ entities, count ] = await this.entity.findAndCount({
            where,
            relations,
            order,
            skip: start,
            take: limit
        })
        return {
            count,
            list: this.transformMany(entities)
        }
    }

    async getOne(
        id: string,
        relations?: string[]
    ): Promise<T> {
        const entity = await this.entity.findOne({
            where: {
                id
            },
            relations
        })
        if (!entity) {
            throw new NotFoundException({message: 'Resource not found.'})
        }
        return entity
    }

    async createEntity(
        inputs: DeepPartial<T>
    ): Promise<T> {
        const errors = await validate(inputs)
        if (errors.length > 0) {
            throw new HttpException({
                    message: 'Input data validation failed'},
                HttpStatus.BAD_REQUEST)
        }
        return await this.entity.save(inputs)
    }

    async createManyEntity(
        inputs: DeepPartial<T>[]
    ): Promise<T[]> {
        const errors = []
        for (const input of inputs) {
            const error = await validate(inputs)
            if (error.length > 0) {
                errors.push(error)
            }
        }
        if (errors.length > 0) {
            throw new HttpException({
                    message: 'Input data validation failed'},
                HttpStatus.BAD_REQUEST)
        }
        return await this.entity.save(inputs)
    }

    async updateEntity(
        id: string,
        inputs: QueryDeepPartialEntity<T>
    ): Promise<T> {
        const updateResult = await this.entity.update(id, inputs)
        if (updateResult.affected === 0) {
            throw new NotFoundException('Nothing to Update.')
        }
        return await this.entity.findOne(id)
    }

    async deleteEntity(
        id: string,
    ): Promise<boolean> {
        const deleteResult = await this.entity.delete(id)

        if (deleteResult.affected === 0) {
            throw new NotFoundException('Nothing to Delete.')
        }
        return true
    }

    transform(model: T, transformOptions = {}): K {
        return model ? plainToClass(BaseSerializer, model, transformOptions) as K : null
    }

    transformMany(
        models: T[],
        transformOptions = {}
    ): K[] {
        return models.length > 0 ? plainToClass(BaseSerializer, models, transformOptions) as K[] : []
    }
}
