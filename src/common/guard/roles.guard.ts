import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req// context.switchToHttp().getRequest()
        const user = request.user
        const role = user.role || null
        return this.matchRoles(roles, role ?.name)
    }

    matchRoles(roles, userRole) {
        return roles.includes(userRole)
    }
}
