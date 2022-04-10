import {
    Args,
    Query,
    Mutation,
    Resolver
} from '@nestjs/graphql'
import {
    UseGuards
} from '@nestjs/common'
import {
    LineLoginConfigInterface
} from '../services/interfaces'
import {
    LineLoginConfigSerializer
} from '../serializers'
import {
    CreateLineConfigInput
} from './input'
import {
    LineLoginConfigService
} from '../services/implements'
import {
    GqlApiKeyAuthGuard
} from '../common'

@Resolver(of => LineLoginConfigSerializer)
@UseGuards(GqlApiKeyAuthGuard)
export class LineLoginConfigResolver {
    constructor(
        private readonly lineLoginConfigService: LineLoginConfigService,
    ) {
    }

    @Query(returns => LineLoginConfigSerializer, {
        name: 'lineLoginConfig',
        nullable: false
    })
    async getOne() {
        return this.lineLoginConfigService.findOne()
    }

    @Mutation(() => LineLoginConfigSerializer, {
        name: 'createLineLoginConfig'
    })
    async create(
        @Args('data') input: CreateLineConfigInput
    ): Promise<LineLoginConfigSerializer> {
        return this.lineLoginConfigService.create(input)
    }
}
