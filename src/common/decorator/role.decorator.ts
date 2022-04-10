import {
    SetMetadata
} from '@nestjs/common'
import {
    AdminRole,
    ClientRole
} from '../../common'

export const Roles = (...roles: AdminRole[] | ClientRole[]) =>
    SetMetadata('roles', roles)
