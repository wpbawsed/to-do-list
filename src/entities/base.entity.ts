import {
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
    PrimaryGeneratedColumn
} from 'typeorm'
import {
    v4 as uuid
} from 'uuid'

export class BaseEntity {
    constructor() {
        this.id = this.id || uuid()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date

    // ---- Subscribers
    @BeforeUpdate()
    updateDates() {
        this.updatedAt = new Date()
    }
}
