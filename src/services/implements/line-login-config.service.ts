import {
    Injectable,
    Inject
} from '@nestjs/common'
import {
    ConfigService
} from '@nestjs/config'
import {
    BaseService} from '.'
import {
    LineLoginConfigEntity
} from '../../entities'
import {
    CreateLineConfigInput,
    UpdateLineConfigInput
} from '../../resolvers/input'
import {
    LineLoginConfigInterface
} from '../interfaces'
import {
    LineLoginConfigSerializer
} from '../../serializers'
import {
    LineLoginConfigRepositoryInterface
} from '../../repositories/interfaces'
import {
    project
} from '../../config'

@Injectable()
export class LineLoginConfigService
    extends BaseService
    implements LineLoginConfigInterface
{
    // private readonly projectName : string

    constructor(
        @Inject('LineLoginConfigRepositoryInterface')
        private readonly lineLoginConfigRepository: LineLoginConfigRepositoryInterface,
        private readonly configService: ConfigService
    ) {
        super()
        // this.projectName = project.getProjectConfig(configService).projectName
    }

    async findOne(): Promise<LineLoginConfigSerializer> {
        const projectName = project.getProjectConfig(this.configService).projectName
        return await this.lineLoginConfigRepository.findByProject(projectName)
    }

    async create(input: CreateLineConfigInput): Promise<LineLoginConfigSerializer> {
        const projectName = project.getProjectConfig(this.configService).projectName
        const newLineConfig =  await this.lineLoginConfigRepository.createEntity(new LineLoginConfigEntity({
            ...input,
            project: projectName
        }))
        return this.lineLoginConfigRepository.transform(newLineConfig)
    }

    async update(input: UpdateLineConfigInput): Promise<any> {
        const projectName = project.getProjectConfig(this.configService).projectName
        const { id } = await this.lineLoginConfigRepository.findByProject(projectName)
        await this.lineLoginConfigRepository.updateEntity(id, input)
        return {
            message: 'ok'
        }
    }
}
