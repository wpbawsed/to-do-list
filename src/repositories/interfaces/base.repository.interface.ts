import {
    DeepPartial
} from 'typeorm'
import {
    QueryDeepPartialEntity
} from 'typeorm/query-builder/QueryPartialEntity'
import {
    BaseSerializer
} from '../../serializers'
import {
    BaseEntity
} from '../../entities'

export interface BaseRepositoryInterface<T extends BaseEntity, K extends BaseSerializer> {
    get(query): Promise<{count: number, list: K[]}>
    getOne(id: string, relations?: string[]): Promise<T>
    createEntity(inputs: DeepPartial<T>): Promise<T>
    createManyEntity(inputs: DeepPartial<T>[]): Promise<T[]>
    updateEntity(id: string, inputs: QueryDeepPartialEntity<T>): Promise<T>
    deleteEntity(id: string): Promise<boolean>
    transform(model: T, transformOptions?:object): K
    transformMany(models: T[],  transformOptions?:object): K[]
}
