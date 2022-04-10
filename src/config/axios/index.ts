// @ts-ignore
import {DirectiveLocation, GraphQLDirective} from 'graphql'
import {HttpModuleOptions} from '@nestjs/axios'
import {ConfigService} from '@nestjs/config'

class AxiosService {
    public getHttpConfig(configService: ConfigService): HttpModuleOptions{
        return {
            timeout: configService.get('HTTP_TIMEOUT'),
            maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
        }
    }
}

export const http = new AxiosService()
