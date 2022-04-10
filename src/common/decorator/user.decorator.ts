import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common'
import {
    GqlContextType
} from '@nestjs/graphql'

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    let req
    if (ctx.getType() === 'http') {
        req = ctx.switchToHttp().getRequest()
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
        req = ctx.getArgByIndex(2).req
    } else if (ctx.getType() === 'rpc') {
        throw new Error('Not implemented')
    }
    if (!req.user) {
        throw new UnauthorizedException({message: 'authorized fail!'})
    }
    return !!data ? req.user[data] : req.user
})
