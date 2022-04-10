import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
    @Field({
        nullable: false
    })
    name: string;

    @Field({
        nullable: false
    })
    phone: string

    @Field({
        nullable: false,
        description: '設定密碼'
    })
    password: string;

    @Field({
        nullable: false,
        description: '設定確認密碼'
    })
    confirmPassword: string;
}
