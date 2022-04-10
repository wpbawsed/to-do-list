import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import {
    BaseEntity,
    MemberEntity,
    ToDoListEntity
} from '.'
import {
    ToDoRepeatUnit
} from '../common'

@Entity('to_do_items')
export class ToDoItemEntity extends BaseEntity{
    constructor(partial: Partial<ToDoItemEntity>) {
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
        name: 'completed',
        default: false
    })
    completed: boolean

    @Column('simple-json', {
        name: 'steps',
        nullable: true
    })
    steps: object

    @Column({
        name: 'favorite',
        default: false
    })
    favorite: boolean

    @Column({
        name: 'one_day',
        default: false
    })
    oneDay: boolean

    @Column({
        name: 'remind',
        nullable: true
    })
    remind: boolean

    @Column({
        name: 'deadline',
        nullable: true
    })
    deadline: Date

    @Column({
        name: 'repeat_num',
        nullable: true
    })
    repeatNum: number

    @Column({
        type: 'enum',
        name: 'repeat_unit',
        enum: ToDoRepeatUnit
    })
    repeatUnit: ToDoRepeatUnit

    @Column({
        name: 'remark',
        default: ''
    })
    remark: string

    @ManyToOne(() => ToDoListEntity)
    @JoinColumn({
        name: 'list_id'
    })
    list: ToDoListEntity

    @ManyToOne(() => MemberEntity)
    @JoinColumn({
        name: 'member_id'
    })
    member: MemberEntity
}
