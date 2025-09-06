import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('getusers')
  GetUser() {
    return this.authService.GetUsers();
    // return 'get users';
  }

  // @Post('signin')
  // signIn(@Body() dto: AuthDto) {
  //   return this.authService.signin(dto);
  // }
}
