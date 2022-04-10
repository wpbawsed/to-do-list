import {ConflictException, Logger} from '@nestjs/common'
import {HttpService} from '@nestjs/axios'
import {ConfigService} from '@nestjs/config'
import * as FormData from 'form-data'
import { createReadStream } from 'fs'
import { join } from 'path'
import { project } from '../../config'

export class UploadImageService {
    // private readonly url : string
    private readonly acceptFile = ['image/jpg', 'image/jpeg', 'image/png']

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        // this.url = project.getProjectConfig(configService).uploadImgUrl
    }

    async upload(file) {
        const { mimetype, filename, path, originalname } = file
        const url = project.getProjectConfig(this.configService).uploadImgUrl
        Logger.log(`image path: ${join(process.cwd(), path)}`, `Upload`)
        const stream = await createReadStream(join(process.cwd(), path))
        if (!this.acceptFile.includes(mimetype)) {
            throw new ConflictException(`檔案副檔名須為${this.acceptFile.join('、')}`)
        }
        const formData = new FormData()
        const name = `${filename}.${originalname.split('.')[1]}`
        formData.append('data', stream, {
            filename: name
        })
        const response = await this.httpService.post(`${url}/upload`, formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Disposition': `attachment filename="${name}"`,
            }
        })
        console.log(`response: ${response}`)
        return response.data
    }
}
