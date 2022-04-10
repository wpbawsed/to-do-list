import {Field, InputType} from '@nestjs/graphql'
import {IsNotEmpty} from 'class-validator'

@InputType({
    description: '更新LineConfig'
})
export class UpdateLineConfigInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string

    @IsNotEmpty()
    @Field({ nullable: false })
    channelId: string

    @IsNotEmpty()
    @Field({ nullable: false })
    channelSecret: string

    @IsNotEmpty()
    @Field({ nullable: false })
    linkLineOA: string
}
