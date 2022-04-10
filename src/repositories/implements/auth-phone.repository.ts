import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from './base.repository'
import {AuthPhoneEntity} from '../../entities'
import {AuthPhoneSerializer} from '../../serializers'
import {AuthPhoneRepositoryInterface} from '../interfaces'

@Injectable()
export class AuthPhoneRepository
    extends BaseRepository<AuthPhoneEntity, AuthPhoneSerializer>
    implements AuthPhoneRepositoryInterface
{
    constructor(
        @InjectRepository(AuthPhoneEntity)
        private readonly authPhoneRepository: Repository<AuthPhoneEntity>,
    ) {
        super(authPhoneRepository)
    }
    async findByPhone(phone: string) : Promise<AuthPhoneEntity> {
        return await this.authPhoneRepository.findOne({
            phone
        })
    }
}
