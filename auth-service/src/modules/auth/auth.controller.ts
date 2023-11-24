import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dto/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<any> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const { accessToken } = await this.authService.createAccessToken({
      userId: userEntity.id
    });

    return {
      accessToken,
      user: userEntity.toDto(),
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<any> {
    await this.authService.validateNewUser(userRegisterDto);

    const createdUser = await this.userService.createUser(
      userRegisterDto,
    );

    const {accessToken } = await this.authService.createAccessToken({
      userId: createdUser.id
    });

    return {
      accessToken,
      user: createdUser.toDto(),
    }
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): any {
    return {
      user: user.toDto()
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'Logout' })
  logout(@AuthUser() _: any): Boolean {
    return true;
  }
}
