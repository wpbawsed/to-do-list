import {
    LineLoginConfigEntity
} from '../../entities'
import {
    LineLoginConfigSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface LineLoginConfigRepositoryInterface
    extends BaseRepositoryInterface<LineLoginConfigEntity, LineLoginConfigSerializer> {
    findByProject(project: string) : Promise<LineLoginConfigSerializer>
}
