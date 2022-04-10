import {ConfigService} from '@nestjs/config'

export interface ProjectOptions {
    mode: string
    projectName: string
    version: string
    uploadImgUrl: string
    backendUrl: string
    frontendUrl: string
}

class ProjectService {
    public getProjectConfig(configService: ConfigService): ProjectOptions{
        return {
            mode: configService.get<string>('MODE', 'dev'),
            projectName: configService.get<string>('PROJECT_NAME', 'ToDoList'),
            version: configService.get<string>('VERSION', '1.0.0'),
            uploadImgUrl: configService.get<string>('UPLOAD_IMG_URL', 'http://localhost:1370'),
            backendUrl: configService.get<string>('BACKEND_URL', 'http://localhost:1370'),
            frontendUrl: configService.get<string>('FRONTEND_URL', 'http://localhost:1370'),
        }
    }
}

export const project = new ProjectService()
