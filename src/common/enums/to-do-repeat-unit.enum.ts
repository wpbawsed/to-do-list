import {registerEnumType} from '@nestjs/graphql'

export enum ToDoRepeatUnit {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year'
}

registerEnumType(ToDoRepeatUnit, {
    name: 'ToDoRepeatUnit',
    description: 'The supported colors.',
});
