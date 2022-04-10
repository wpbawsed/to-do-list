import {
    Entity,
    Column,
} from 'typeorm'
import {
    BaseEntity
} from '.'

@Entity('line_login_configs')
export class LineLoginConfigEntity extends BaseEntity{
    constructor(partial: Partial<LineLoginConfigEntity>) {
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
        name: 'channel_id'
    })
    channelId: string

    @Column({
        name: 'channel_secret'
    })
    channelSecret: string

    @Column({
        name: 'link_line_oa'
    })
    linkLineOA: string

    @Column({
        name: 'project'
    })
    project: string
}
