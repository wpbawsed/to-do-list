import {
    Entity,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm'
import {
    BaseEntity,
    UserEntity
} from '.'

@Entity('auth_line')
export class AuthLineEntity extends BaseEntity{
    constructor(partial: Partial<AuthLineEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }

    @Column({
        name: 'line_user_is'
    })
    lineUserId: string

    @OneToOne(() => UserEntity, {
        eager: true
    })
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity
}
