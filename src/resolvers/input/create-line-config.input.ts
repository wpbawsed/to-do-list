import {
    Field,
    InputType
} from '@nestjs/graphql'
import {
    IsNotEmpty
} from 'class-validator'

@InputType({
    description: '建立LineConfig'
})
export class CreateLineConfigInput {
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
