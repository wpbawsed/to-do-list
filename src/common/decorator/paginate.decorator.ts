import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'
import {
    isString
} from 'lodash'

const orderByType = [
    'ASC',
    'DESC'
]

export const Paginate = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    const { query } = req
    const { sortBy, start, limit } = query
    const order = {}

    if (sortBy) {
        const params = !Array.isArray(sortBy) ? [sortBy] : sortBy
        for (const param of params) {
            if (isString(param)) {
                const [ key, orderBy ] = param.split(':')
                // 檢查key是否為data中的資料
                if (orderByType.includes(orderBy)) {
                    order[key] = orderBy
                }
            }
        }
    }

    return {
        ...query,
        order: Object.keys(order).length > 0 ? order : null,
        start: start ? parseInt(start.toString(), 10) : 0,
        limit: limit ? parseInt(limit.toString(), 10) : 10
    }
})
