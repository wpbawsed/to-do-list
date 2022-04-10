import {Expose} from 'class-transformer'
import {Field, ObjectType} from '@nestjs/graphql'
import {BaseSerializer} from '.'

@ObjectType('Role', {
    description: 'Role'
})
export class RoleSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => String)
    description: string
}

@ObjectType('Roles', {
    description: 'Roles'
})
export class RolesSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    count: string

    @Expose()
    @Field(() => [RoleSerializer], { nullable: false })
    list: RoleSerializer[]
}
