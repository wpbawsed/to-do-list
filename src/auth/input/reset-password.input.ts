import {IsNotEmpty} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class ResetPasswordInput {
    @IsNotEmpty()
    @Field(() => String, {
        nullable: false,
        description: '',
    })
    readonly token: string

    @IsNotEmpty()
    @Field(() => String, {
        nullable: false,
        description: '',
    })
    readonly newPassword: string

    @IsNotEmpty()
    @Field(() => String, {
        nullable: false,
        description: '',
    })
    readonly confirmPassword: string
}
