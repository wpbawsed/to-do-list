import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import {
    BaseEntity,
    MemberEntity,
    ToDoListEntity
} from '.'

@Entity('to_do_groups')
export class ToDoGroupEntity extends BaseEntity{
    constructor(partial: Partial<ToDoGroupEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }
    @Column({
        name: 'name'
    })
    name: string

    @ManyToOne(() => MemberEntity)
    @JoinColumn({
        name: 'member_id'
    })
    member: MemberEntity[]

    @OneToMany(() => ToDoListEntity, toDoList => toDoList.group)
    lists: ToDoListEntity[]
}
