import {ConfigService} from '@nestjs/config'
import {ThrottlerModuleOptions} from '@nestjs/throttler'

class ThrottlerService {
    public getThrottlerConfig(configService: ConfigService): ThrottlerModuleOptions{
        return {
            ttl: configService.get<number>('THROTTLE_TTL'),
            limit: configService.get<number>('RATE_LIMIT_MAX'),
        }
    }
}

export const throttler = new ThrottlerService()
