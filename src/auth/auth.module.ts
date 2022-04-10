import {
	Module
} from '@nestjs/common'
import {
	JwtModule
} from '@nestjs/jwt'
import {
	PassportModule
} from '@nestjs/passport'
import {
	ConfigModule,
	ConfigService
} from '@nestjs/config'
import {
	AuthService
} from './auth.service'
import {
	JwtStrategy
} from './jwt.strategy'
import {
	AuthResolver
} from './auth.resolver'
import {
	ApiKeyStrategy
} from './api-key.strategy'
import {
	secret
} from '../config'

@Module({
	imports: [
		ConfigModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
			session: true
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: secret.getSecretConfig
		})
	],
	providers: [
		AuthResolver,
		AuthService,
		JwtStrategy,
		ApiKeyStrategy
	]
})
export class AuthModule {}
