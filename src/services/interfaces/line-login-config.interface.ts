import {
    CreateLineConfigInput,
    UpdateLineConfigInput
} from '../../resolvers/input'
import {
    LineLoginConfigSerializer
} from '../../serializers';

export interface LineLoginConfigInterface {
    findOne(): Promise<LineLoginConfigSerializer>
    create(input: CreateLineConfigInput): Promise<LineLoginConfigSerializer>
    update(input: UpdateLineConfigInput): Promise<any>
}
