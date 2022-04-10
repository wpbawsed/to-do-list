import {PermissionEntity} from '../../entities'
import {PermissionSerializer} from '../../serializers'
import {BaseRepositoryInterface} from '.'

export interface PermissionRepositoryInterface
    extends BaseRepositoryInterface<PermissionEntity, PermissionSerializer> {
}
