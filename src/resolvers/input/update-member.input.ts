import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '更新 Member 資料'
})
export class UpdateMemberInput {
    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    phone: string

    @Field({ nullable: true })
    avatar: string
}
