import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import {
    BaseEntity,
    UserEntity
} from '.'

@Entity('images')
export class ImageEntity extends BaseEntity{
    constructor(partial: Partial<ImageEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }
    @Column({
        name: 'type'
    })
    type: string

    @Column({
        name: 'filename'
    })
    filename: string

    @Column({
        name: 'mimetype',
        nullable: true
    })
    mimetype: string

    // ---- 存在自己的table
    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity
}
