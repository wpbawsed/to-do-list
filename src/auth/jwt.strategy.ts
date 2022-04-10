import {
	ExtractJwt,
	Strategy
} from 'passport-jwt'
import {
	PassportStrategy
} from '@nestjs/passport'
import {
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import {
	ConfigService
} from '@nestjs/config'
import {
	getRepository
} from 'typeorm'
import {
	UserEntity
} from '../entities'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('SECRET_KEY', 'secret-key')
		})
	}

	async validate(payload: any) {
		try {
			const { sub, exp } = payload
			return await getRepository(UserEntity).findOne({ id: sub })
		} catch (err) {
			throw new UnauthorizedException('Email or password is incorrect.')
		}
	}
}
