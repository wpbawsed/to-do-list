import {
    Expose
} from "class-transformer"
import {
    Field,
    ObjectType
} from '@nestjs/graphql'
import {
    BaseSerializer
} from '.'

@ObjectType('Permission', {
    description: 'Permission'
})
export class PermissionSerializer extends BaseSerializer{
    @Expose()
    @Field(() => String, { nullable: false })
    name: string

    @Expose()
    @Field(() => String, { nullable: false })
    controller: string

    @Expose()
    @Field(() => String, { nullable: false })
    action: string
}

@ObjectType('Permissions', {
    description: 'Permissions'
})
export class PermissionsSerializer {
    @Expose()
    @Field(() => String, { nullable: false })
    count: string

    @Expose()
    @Field(() => [PermissionSerializer], { nullable: false })
    list: PermissionSerializer[]
}
