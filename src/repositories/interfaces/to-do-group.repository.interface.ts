import {
    ToDoGroupEntity
} from '../../entities'
import {
    ToDoGroupSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface ToDoGroupRepositoryInterface
    extends BaseRepositoryInterface<ToDoGroupEntity, ToDoGroupSerializer> {
    findByName(name: string) : Promise<ToDoGroupEntity>
}
