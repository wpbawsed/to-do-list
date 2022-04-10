import * as argon2 from 'argon2'
import {
	Injectable, NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import {
	JwtService
} from '@nestjs/jwt'
import {
	ConfigService
} from '@nestjs/config'
import {
	EntityManager,
	getRepository
} from 'typeorm'
import {
	omit
} from 'lodash'
import {
	AuthLineEntity,
	AuthPhoneEntity,
	UserEntity,
	// VerifyCodeRecordEntity
} from '../entities'
import {
	TokenType
} from './type'
import {
	LineLoginInput,
	PhoneLoginInput,
	ChangePasswordInput,
	ResetPasswordInput
} from './input'

@Injectable()
export class AuthService {
	private readonly projectName : string
	private readonly jwtExpires : number
	private readonly masterKey : string

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.projectName = configService.get<string>('PROJECT_NAME', 'ToDoList')
		this.jwtExpires = configService.get<number>('JWT_EXPIRES', 2592000)
		this.masterKey = configService.get<string>('MASTER_KEY', 'master-key')
	}

	async phoneAuthValidate(phone: string, password: string): Promise<AuthPhoneEntity> {
		const authPhone = await getRepository(AuthPhoneEntity).findOne({
			where: {
				phone
			},
			relations: [
				'user'
			]
		})

		if (!authPhone) {
			throw new UnauthorizedException('phone or password is incorrect.')
		}

		if(!(await argon2.verify(authPhone.password, password))) {
			throw new UnauthorizedException('phone or password is incorrect.')
		}

		omit(authPhone, 'password')
		return authPhone
	}

	async lineAuthValidate(lineToken: string, lineUserId: string): Promise<any> {
		// ---- 驗證line-token是否正確
		if (!(await this.lineTokenValidate(lineToken))) {
			throw new UnauthorizedException('Line token is incorrect.')
		}

		// ---- 取得個人資訊
		const { userId } = await this.getLineProfile(lineToken, lineUserId)

		const authLine = await getRepository(AuthLineEntity).findOne({
			where: {
				lineUserId: userId
			},
			relations: [
				'user'
			]
		})

		if (!authLine) {
			throw new UnauthorizedException('line token is incorrect.')
		}

		return authLine
	}

	async apiKeyAuthValidate(apiKey: string): Promise<boolean> {
		return apiKey === this.masterKey
	}

	async lineTokenValidate(accessToken) {
		return true
		// 取得lineToken資訊
		// const { channelId } = await this.lineLoginConfigRepository.findByProject(this.projectName)
		// return await this.lineApiService.verify({
		// 	channelId,
		// 	accessToken
		// })
	}

	async getLineProfile(accessToken, lineUserId) {
		return {
			userId: 'testId'
		}
		// 取得lineToken資訊
		// const { userId } = await this.lineApiService.getProfile({
		// 	accessToken
		// })
		//
		// if (userId !== lineUserId) {
        //     throw new ConflictException({message: 'line userId not match!!'})
		// }
		//
		// return {
		// 	userId
		// }
	}

	async isExistPhone(phone: string): Promise<any> {
		const authPhone = await getRepository(AuthPhoneEntity).findOne({
			where: {
				phone
			}
		})
		return {
			isExist: !!authPhone
		}
	}

	async isExistLineUserId(lineUserId: string): Promise<any> {
		const authLine = await getRepository(AuthLineEntity).findOne({
			where: {
				lineUserId
			}
		})
		return {
			isExist: !!authLine
		}
	}

	async phoneLogin(phoneLoginInput: PhoneLoginInput): Promise<TokenType> {
		const { phone, password } = phoneLoginInput
		const { user } = await this.phoneAuthValidate(phone, password)
		return await this.login(user)
	}

	async lineLogin(lineLoginInput: LineLoginInput): Promise<TokenType> {
		const { lineToken, lineUserId } = lineLoginInput
		const { user } = await this.lineAuthValidate(lineToken, lineUserId)
		return await this.login(user)
	}

	async login(user: UserEntity): Promise<TokenType> {
		const { id } = user
		const payload = { sub: id }
		const expiresIn = this.jwtExpires

		return {
			token: this.jwtService.sign(payload, {
				expiresIn
			}),
		}
	}
    async checkVerifyCode(manager: EntityManager, token: string) {
		// const verifyCode = await manager.findOne(VerifyCodeRecordEntity, {
        //     type: VerifyCodeType.FORGET_PASSWORD,
        //     token,
        //     expired: true
        // })
        // if (!verifyCode) {
        //     throw new NotFoundException({ message: 'verify token not found'})
        // }
        // return verifyCode
    }

	async resetPwd(resetPwdDto: ResetPasswordInput): Promise<any> {
		// const {token, newPassword, confirmPassword} = resetPwdDto
		//
		// await getManager().transaction( async manager => {
		// 	// 驗證token
		// 	const verifyCode = await this.checkVerifyCode(manager, token)
        //     const { id } = await manager.findOne(AuthPhoneEntity, {
        //         phone: verifyCode.agent
        //     })
        //     // 驗證新密碼跟確認密碼是否一致
		// 	if(newPassword !== confirmPassword) {
		// 		throw new ConflictException({message: 'new password and confirm password not match!!'})
		// 	}
		// 	// 更新密碼
		// 	await manager.update(AuthPhoneEntity, {
        //         id
        //     }, {
		// 		password: await argon2.hash(newPassword)
		// 	})
		// 	// 刪除token
        //     await manager.remove(verifyCode)
        // })
		return {
			message: 'ok'
		}
	}

	async changePwd(userId: string, changePwd: ChangePasswordInput): Promise<any> {
		// const { oldPassword, newPassword, confirmPassword} = changePwd
		// // 驗證原密碼
		// const { id, password }  = await getConnection()
		// .getRepository(AuthPhoneEntity)
		// .createQueryBuilder('authPhone')
    	// .where('authPhone.user_id = :id', { id: userId })
		// .getOne();
		//
		// if (!await argon2.verify(password, oldPassword)) {
		// 	throw new UnauthorizedException('old password is incorrect.')
		// }
		//
		// // 驗證新密碼跟確認密碼是否一致
		// if(newPassword !== confirmPassword) {
		// 	throw new ConflictException({message: 'new password and confirm password not match!!'})
		// }
		//
		// // 更新密碼
		// await getConnection()
		// .createQueryBuilder()
		// .update(AuthPhoneEntity)
		// .set({ password: await argon2.hash(newPassword) })
		// .where('id = :id', { id })
		// .execute();

		return {
			message: 'ok'
		}
	}

	logout(user: UserEntity): boolean {
		return true
	}
}
