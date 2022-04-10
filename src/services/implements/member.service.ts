import {
    Inject,
    Injectable,
    UnauthorizedException,
    ConflictException
} from '@nestjs/common'
import {
    getManager
} from 'typeorm'
import {
    ConfigService
} from '@nestjs/config'
import {
    BaseService,
    FindType
} from '.'
import {
    AuthLineEntity,
    MemberEntity,
    UserEntity
} from '../../entities'
import {
    CreateMemberInput,
    UpdateMemberInput
} from '../../resolvers/input'
import {
    MemberInterface
} from '../interfaces'
import {
    MemberSerializer
} from '../../serializers'
import {
    AuthLineRepositoryInterface,
    MemberRepositoryInterface,
    RoleRepositoryInterface,
    UserRepositoryInterface,
    LineLoginConfigRepositoryInterface,
    ImageRepositoryInterface,
} from '../../repositories/interfaces'
import {
    LineLoginApiService
} from '../helper'
import {
    project
} from '../../config'
import {
    ClientRole
} from '../../common'

@Injectable()
export class MemberService extends BaseService implements MemberInterface{
    // private readonly projectName : string

    constructor(
        @Inject('MemberRepositoryInterface')
        private readonly memberRepository: MemberRepositoryInterface,
        @Inject('AuthLineRepositoryInterface')
        private readonly authLineRepository: AuthLineRepositoryInterface,
        @Inject('RoleRepositoryInterface')
        private readonly rolesRepository: RoleRepositoryInterface,
        @Inject('UserRepositoryInterface')
        private readonly usersRepository: UserRepositoryInterface,
        @Inject('LineLoginConfigRepositoryInterface')
        private readonly lineLoginConfigRepository: LineLoginConfigRepositoryInterface,
        @Inject('ImageRepositoryInterface')
        private readonly imageRepository: ImageRepositoryInterface,
        private readonly configService: ConfigService,
        private readonly lineLoginApiService: LineLoginApiService
    ) {
        super()
        // this.projectName = project.getProjectConfig(configService).projectName
    }

    async checkCreateData(lineToken: string, lineUserId: string, role: string) {
        // ---- 驗證line-token是否正確
        if (!(await this.lineTokenValidate(lineToken))) {
            throw new UnauthorizedException('line token is incorrect.')
        }
        // ---- 取得個人資訊
        const { userId } = await this.getLineProfile(lineToken, lineUserId)

        // ---- 檢查是否存在
        const authLine = await this.authLineRepository.findByLineUserId(userId)
        if (authLine) {
            throw new ConflictException({message: 'member is already exist'})
        }

        const roleRepository = await this.rolesRepository.findByName(role)
        if (!roleRepository) {
            throw new ConflictException({message: 'role name not found'})
        }
        return {
            role: roleRepository
        }
    }

    async checkUpdateData(member: MemberEntity, input: UpdateMemberInput) {
        const { name, phone, avatar } = input
        const avatarEntity = avatar ? await this.imageRepository.getOne(avatar) : member.avatar
        return {
            name: name ?? member.name,
            phone: phone ?? member.phone,
            avatar: avatarEntity
        }
    }

    async lineTokenValidate(accessToken) {
        // 取得lineToken資訊
        const projectName = project.getProjectConfig(this.configService).projectName
        const { channelId } = await this.lineLoginConfigRepository.findByProject(projectName)
        return await this.lineLoginApiService.verify({
            channelId,
            accessToken
        })
    }

    async getLineProfile(accessToken, lineUserId) {
		// 取得lineToken資訊
		const { userId } = await this.lineLoginApiService.getProfile({
			accessToken
		})

		if (userId !== lineUserId) {
            throw new ConflictException({message: 'line userId not match!!'})
		}

		return {
			userId
		}
    }

    // async checkVerifyCode(manager: EntityManager, phone: string, token: string) {
    //     const verifyCode = await manager.findOne(VerifyCodeRecordEntity, {
    //         agent: phone,
    //         type: VerifyCodeType.REGISTER,
    //         token,
    //         expired: true
    //     })
    //     if (!verifyCode) {
    //         throw new NotFoundException({ message: 'verify token not found'})
    //     }
    //     return verifyCode
    // }

    async createMember({ name, phone, lineUserId, role, token}) {
        return await getManager().transaction( async manager => {
            // const verifyCode = await this.checkVerifyCode(manager, phone, token)
            const user = await manager.save(UserEntity, {
                name,
                role
            })
            const member = await manager.save(MemberEntity, {
                name,
                phone,
                user
            })
            await manager.save(AuthLineEntity, {
                lineUserId,
                user
            })
            // await manager.remove(verifyCode)
            return member
        })
    }

    async findAll(query): Promise<{count: number, list: MemberSerializer[]}> {
        const where = this.findOption(
            query,
            ['name', FindType.LIKE],
            ['phone', FindType.LIKE])
        const relations = []
        return await this.memberRepository.get({
            ...query,
            where,
            relations
        })
    }

    async findOne(id): Promise<MemberSerializer> {
        return this.memberRepository.transform(
            await this.memberRepository.getOne(id, ['tags'])
        )
    }

    async findMe(userId): Promise<MemberSerializer> {
        return this.memberRepository.transform(
            await this.memberRepository.findByUser(userId)
        )
    }

    async create(input: CreateMemberInput): Promise<MemberSerializer> {
        const { lineToken, lineUserId } = input
        const { role } = await this.checkCreateData(lineToken, lineUserId, ClientRole.USER_CLIENT)
        const member = await this.createMember({
            ...input,
            token: lineToken,
            role
        })
        return this.memberRepository.transform(member)
    }

    async update(userId: string, input: UpdateMemberInput): Promise<any> {
        const member = await this.memberRepository.findByUser(userId)
        const { name, phone, avatar } = await this.checkUpdateData(member, input)
        await this.memberRepository.updateEntity(member.id, {
            name,
            phone,
            avatar,
        })
        return {
            message: 'ok'
        }
    }

    async delete(id: string): Promise<any> {
        await this.memberRepository.deleteEntity(id)
        return {
            message: 'ok'
        }
    }

}
