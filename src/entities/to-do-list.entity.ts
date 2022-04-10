import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import {
    BaseEntity, MemberEntity,
    ToDoGroupEntity,
    ToDoItemEntity
} from '.'

@Entity('to-do-lists')
export class ToDoListEntity extends BaseEntity{
    constructor(partial: Partial<ToDoListEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }
    @Column({
        name: 'name'
    })
    name: string

    @Column({
        name: 'is_system',
        default: false
    })
    isSystem: boolean

    @ManyToOne(() => ToDoGroupEntity)
    @JoinColumn({
        name: 'group_id'
    })
    group: ToDoGroupEntity

    @ManyToOne(() => MemberEntity)
    @JoinColumn({
        name: 'member_id'
    })
    member: MemberEntity

    @OneToMany(() => ToDoItemEntity, toDoItem => toDoItem.list)
    items: ToDoItemEntity[]
}
