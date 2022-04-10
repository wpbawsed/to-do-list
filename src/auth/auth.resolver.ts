import {
  Args,
  Mutation
} from '@nestjs/graphql'
import {
  Inject
} from '@nestjs/common'
import {
  LineLoginInput,
  PhoneLoginInput
} from './input'
import {
  AuthService
} from './auth.service'
import {
  TokenType
} from './type'

export class AuthResolver {
  constructor(
      @Inject(AuthService)
      private readonly authService: AuthService
  ) {
  }

  // @Mutation(() => class {
  //   isExist: boolean
  // }, {
  //   name: 'isExistPhone',
  //   description: '檢查是否有存在的手機號碼'
  // })
  // async isExistPhone(
  //     @Args('data') input: PhoneLoginInput
  // ) {
  //   return this.authService.isExistPhone(phone)
  // }

  @Mutation(() => TokenType, {
    name: 'phoneLogin',
    description: '手機登入'
  })
  async phoneLogin(
      @Args('data') input: PhoneLoginInput
  ): Promise<TokenType> {
    return this.authService.phoneLogin(input)
  }

  // @Get('line')
  // async isExistLineUserId(
  //     @Query('lineUserId') lineUserId: string
  // ) {
  //   return this.authService.isExistLineUserId(lineUserId)
  // }

  @Mutation(() => TokenType, {
    description: 'Line Access Token登入'
  })
  async lineLogin(
      @Args('data') input: LineLoginInput,
  ): Promise<TokenType> {
    return this.authService.lineLogin(input)
  }

  // async resetPwd(
  //     @Body() resetPasswordDto: ResetDesignerPasswordDto
  // ) {
  //   return this.authService.resetPwd(resetPasswordDto)
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // async changePwd(
  //     @User('id') userId: string,
  //     @Body() changePasswordDto: ChangeDesignerPasswordDto
  // ) {
  //   return this.authService.changePwd(userId, changePasswordDto)
  // }
}
