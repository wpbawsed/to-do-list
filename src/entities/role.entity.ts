import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm'
import {
    BaseEntity,
    PermissionEntity,
    UserEntity
} from '.'

@Entity('roles')
export class RoleEntity extends BaseEntity{
    constructor(partial: Partial<RoleEntity>) {
        super()
        if (partial) {
            Object.assign(this, partial)
        }
    }
    @Column({
        name: 'name',
        unique: true
    })
    name: string

    @Column({
        name: 'description'
    })
    description: string

    @OneToMany(() => PermissionEntity, permission => permission.role)
    permission: PermissionEntity[]

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}
