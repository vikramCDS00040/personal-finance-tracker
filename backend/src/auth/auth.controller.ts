import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register() {
    return 'hello world';
  }
  @Get('signin')
  signIn() {
    return 'hello world';
  }
}
