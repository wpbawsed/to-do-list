import {IsNotEmpty} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class ChangePasswordInput {
  @IsNotEmpty()
  @Field(() => String, {
    nullable: false,
    description: '',
  })
  readonly oldPassword: string

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
