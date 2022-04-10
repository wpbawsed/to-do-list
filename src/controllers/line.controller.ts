import {Controller, Inject, Query, Get, Post, Redirect} from '@nestjs/common'
import {LineInterface} from '../services/interfaces'
import {LineNotifyCallbackDto} from './dto'
import {Auth, User, ClientRole} from '../common'

@Controller()
export class LineController {
  constructor(
      @Inject('LineInterface')
      private readonly lineService: LineInterface
  ) {
  }

  @Get('notify/access')
  @Auth(ClientRole.USER_CLIENT)
  async lineNotifyAccess(
      @User('id') userId: string,
      @Query('redirectUrl') redirectUrl: string
  ): Promise<any> {
    return await this.lineService.accessNotify(userId, redirectUrl)
  }

  @Post('notify/revoke')
  @Auth(ClientRole.USER_CLIENT)
  async lineNotifyRevoke(
      @User('id') userId: string
  ): Promise<any> {
    return await this.lineService.revokeNotify(userId)
  }

  @Post('notify/rebind')
  @Auth(ClientRole.USER_CLIENT)
  async lineNotifyReBind(
      @User('id') userId: string,
      @Query('redirectUrl') redirectUrl: string
  ): Promise<any> {
    return await this.lineService.rebindNotify(userId, redirectUrl)
  }

  @Get('notify/callback')
  @Redirect()
  async lineNotifyCallBack(
      @Query() dto: LineNotifyCallbackDto
  ): Promise<any> {
    return await this.lineService.notifyCallback(dto)
  }
}
