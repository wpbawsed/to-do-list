import {
    applyDecorators,
    SetMetadata,
    UseGuards
} from '@nestjs/common'
import {
    GqlJWTAuthGuard,
    RolesGuard
} from '../'
import {
    AdminRole,
    ClientRole,
    MasterRole
} from '../../common'

type Role = MasterRole | AdminRole | ClientRole

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(GqlJWTAuthGuard, RolesGuard),
    )
}
