import {IsNotEmpty} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class LineLoginInput {
  @IsNotEmpty()
  @Field(() => String, {
      nullable: false,
      description: '',
  })
  readonly lineToken: string

  @IsNotEmpty()
  @Field(() => String, {
      nullable: false,
      description: '',
  })
  readonly lineUserId: string
}
