import {ConfigService} from '@nestjs/config'
import {JwtModuleOptions} from '@nestjs/jwt'

class SecretService {
    public getSecretConfig(configService: ConfigService): JwtModuleOptions{
        const secretKey = configService.get<string>('SECRET_KEY', 'secret-key')
        const jwtExpires = configService.get<number>('JWT_EXPIRES', 60 * 60 * 24 * 30)
        return {
            secret: secretKey,
            signOptions: {
                expiresIn: jwtExpires
            },
        }
    }
}

export const secret = new SecretService()
