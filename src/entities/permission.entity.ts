import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import {
    BaseEntity,
    RoleEntity
} from '.'

@Entity('permissions')
export class PermissionEntity extends BaseEntity{
    constructor(partial: Partial<PermissionEntity>) {
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
        name: 'controller'
    })
    controller: string

    @Column({
        name: 'action'
    })
    action: string

    // ---- Relation
    @ManyToOne(() => RoleEntity, role => role.permission)
    @JoinColumn({
        name: 'role_id'
    })
    role: RoleEntity
}
