import {
    ToDoListEntity
} from '../../entities'
import {
    ToDoListSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface ToDoListRepositoryInterface
    extends BaseRepositoryInterface<ToDoListEntity, ToDoListSerializer> {
    findByName(name: string) : Promise<ToDoListEntity>
}
