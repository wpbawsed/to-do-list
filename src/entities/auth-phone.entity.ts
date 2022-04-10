import * as argon2 from 'argon2'
import {
    Entity,
    Column,
    BeforeInsert,
    OneToOne,
    JoinColumn
} from 'typeorm'
import {
    BaseEntity,
    UserEntity
} from '.'

@Entity('auth_phone')
export class AuthPhoneEntity extends BaseEntity{
    constructor(partial: Partial<AuthPhoneEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }

    @Column({
        name: 'phone'
    })
    phone: string

    @Column({
        name: 'password'
    })
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password)
    }

    @OneToOne(() => UserEntity, {
        eager: true
    })
    @JoinColumn({
        name: 'user_id'
    })
    user: UserEntity
}
