import {
    Entity,
    Column,
    JoinColumn,
    OneToOne
} from 'typeorm'
import {
    IsEmail
} from 'class-validator'
import {
    BaseEntity,
    ImageEntity,
    UserEntity,
} from '.'

@Entity('members')
export class MemberEntity extends BaseEntity{
    constructor(partial: Partial<MemberEntity>) {
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
        name: 'phone'
    })
    phone: string

    // ---- Relation
    @OneToOne(() => ImageEntity, {
        eager: true
    })
    @JoinColumn({
        name: 'avatar'
    })
    avatar: ImageEntity

    @OneToOne(() => UserEntity, user => user.member)
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity
}
