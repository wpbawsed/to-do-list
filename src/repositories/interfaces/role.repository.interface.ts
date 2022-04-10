import {RoleEntity} from '../../entities'
import {RoleSerializer} from '../../serializers'
import {BaseRepositoryInterface} from '.'

export interface RoleRepositoryInterface
    extends BaseRepositoryInterface<RoleEntity, RoleSerializer> {
    findByName(name: string) : Promise<RoleEntity>
    findByRole(...role: string[]) : Promise<RoleEntity[]>
}
