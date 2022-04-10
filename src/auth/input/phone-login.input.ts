import {IsNotEmpty} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType({
    description: '使用者電話登入'
})
export class PhoneLoginInput {
  @IsNotEmpty()
  @Field({
      nullable: false
  })
  phone: string

  @IsNotEmpty()
  @Field({
      nullable: false
  })
  password: string
}

