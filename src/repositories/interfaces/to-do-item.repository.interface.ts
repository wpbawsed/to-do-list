import {
    ToDoItemEntity
} from '../../entities'
import {
    ToDoItemSerializer
} from '../../serializers'
import {
    BaseRepositoryInterface
} from '.'

export interface ToDoItemRepositoryInterface
    extends BaseRepositoryInterface<ToDoItemEntity, ToDoItemSerializer> {
}
