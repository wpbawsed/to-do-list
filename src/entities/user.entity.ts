import {
    Entity,
    Column,
    ManyToOne,
    JoinTable,
    OneToOne
} from 'typeorm'
import {
    AuthPhoneEntity,
    AuthLineEntity,
    BaseEntity,
    RoleEntity,
    MemberEntity
} from '.'

@Entity('users')
export class UserEntity extends BaseEntity{
    constructor(partial: Partial<UserEntity>) {
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
        name: 'block',
        default: false
    })
    block: boolean

    // ---- 存在自己的table
    @ManyToOne(() => RoleEntity, role => role.users, {
        eager: true
    })
    @JoinTable({
        name: 'role_id'
    })
    role: RoleEntity

    @OneToOne(() => MemberEntity, member => member.user)
    member: MemberEntity

    @OneToOne(() => AuthLineEntity, authLine => authLine.user)
    authLine: AuthLineEntity

    @OneToOne(() => AuthPhoneEntity, authPhone => authPhone.user)
    authPhone: AuthPhoneEntity
}
