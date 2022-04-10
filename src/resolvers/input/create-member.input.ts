import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立 Member 資料'
})
export class CreateMemberInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string

    @IsNotEmpty()
    @Field({ nullable: false })
    phone: string

    @IsNotEmpty()
    @Field({ nullable: false })
    lineToken: string

    @IsNotEmpty()
    @Field({ nullable: false })
    lineUserId: string
}
