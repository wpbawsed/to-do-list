import Strategy from 'passport-headerapikey'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
	constructor(
		private readonly authService: AuthService
	) {
		super({ header: 'X-API-KEY', prefix: '' },
			true,
			async (apiKey, done) => {
				return this.validate(apiKey, done)
			})
	}

	async validate(apiKey: string, done: (error: Error, data) => {}): Promise<any> {
		try {
			const result = await this.authService.apiKeyAuthValidate(apiKey)

			if (!result) {
				throw new UnauthorizedException('API is incorrect.')
			}

			done(null, {
				message: 'ok'
			})
		} catch (err) {
			done(err, null)
		}
	}
}
