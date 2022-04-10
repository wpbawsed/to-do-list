import {
    Expose
} from 'class-transformer'
import {
    Field,
    ObjectType,
    ID,
} from '@nestjs/graphql';

@ObjectType()
export class BaseSerializer {
    @Expose()
    @Field(() => ID, { nullable: false })
    id: string;

    @Expose()
    @Field(() => Date, { nullable: false })
    createdAt: Date;

    @Expose()
    @Field(() => Date, { nullable: false })
    updatedAt: Date;

    [key: string]: any;
}
