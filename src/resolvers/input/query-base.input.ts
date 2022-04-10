import {ArgsType, Field, Int} from '@nestjs/graphql'

@ArgsType()
export class QueryBaseInput {
    @Field(() => String, {
        nullable: true,
        description: '單一個：createdAt:ASC，多個：[createdAt:ASC, order:DESC]',
    })
    sortBy: string

    @Field(() => Int, {
        nullable: true,
        description: '',
        defaultValue: 0
    })
    start: number

    @Field(() => Int, {
        nullable: true,
        description: '',
        defaultValue: 10
    })
    limit: number
}
