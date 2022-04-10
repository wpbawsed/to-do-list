import {
    ArgsType, Field,
} from '@nestjs/graphql'
import {
    QueryBaseInput
} from '.'

@ArgsType()
export class QueryRoleInput extends QueryBaseInput {
}
