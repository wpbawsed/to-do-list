import {
    Equal,
    LessThan,
    Like,
    MoreThan
} from 'typeorm'
import {
    assign
} from 'lodash'

export enum FindType {
    LIKE,
    EQUAL,
    MORE_THAN,
    LESS_THAN
}

export class BaseService {
    findType(type, value) {
        switch (type) {
            case FindType.LIKE:
                return Like(`%${value}%`)
            case FindType.EQUAL:
                return Equal(`${value}`)
            case FindType.MORE_THAN:
                return MoreThan(`${value}`)
            case FindType.LESS_THAN:
                return LessThan(`${value}`)
        }
    }
    customKeyToObject(value, customKey, type) {
        const custom = customKey[0]
        if (customKey.length === 1) {
            return {
                [custom]: this.findType(type, value)
            }
        } else {
            customKey.shift()
            return {
                [custom]: this.customKeyToObject(value, customKey, type)
            }
        }
    }
    // { designer: aaa } , [ ['designer.name', FindType.EQUAL] ]
    findOption(query, ...findField) {
        return findField.reduce((acc, field) => {
            const [ key, type, customKey ] = field
            if (query[key]) {
                if (customKey) {
                    assign(acc, this.customKeyToObject(query[key], customKey.split('.'), type))
                } else {
                    assign(acc, {
                        [key]: this.findType(type, query[key])
                    })
                }
            }
            return acc
        }, {})
    }
}
