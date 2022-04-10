import {
	ID,
	Field,
	ObjectType
} from '@nestjs/graphql'

@ObjectType('Token', {
	description: 'User Token'
})
export class TokenType {
	@Field(() => String, {
		nullable: false,
	})
	readonly token: string
}
