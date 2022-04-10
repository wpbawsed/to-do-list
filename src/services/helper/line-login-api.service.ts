import {HttpService} from '@nestjs/axios';

export class LineLoginApiService {
    private url = 'https://api.line.me'

    constructor(
        private readonly httpService: HttpService
    ) {
    }

    /***
     * Verify the validity of the channel access token
     * 主要是為了登入使用
     * @param channelId
     * @param accessToken
     */
    async verify({channelId, accessToken}) {
        const {data} = await this.httpService.get(`${this.url}/oauth2/v2.1/verify`, {
            params: {
                access_token: `${accessToken}`,
            },
        })
        const {client_id} = data
        return client_id && client_id === channelId
    }

    async verifyProfile({accessToken, lineUserId}) {
        const { data } = await this.httpService.get(`${this.url}/v2/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const {userId} = data
        return userId && userId === lineUserId
    }

    async getProfile({accessToken}) {
        try {
            const { data } = await this.httpService.get(`${this.url}/v2/profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            return data
        } catch (error) {
            throw new Error('LINE驗證失敗')
        }
    }
}
