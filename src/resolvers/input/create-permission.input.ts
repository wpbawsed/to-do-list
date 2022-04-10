import {
    IsNotEmpty
} from 'class-validator'
import {
    Field,
    InputType
} from '@nestjs/graphql'

@InputType({
    description: '建立Permission資訊'
})
export class CreatePermissionInput {
    @IsNotEmpty()
    @Field({ nullable: false })
    name: string

    @IsNotEmpty()
    @Field({ nullable: false })
    controller: string

    @IsNotEmpty()
    @Field({ nullable: false })
    action: string
}
