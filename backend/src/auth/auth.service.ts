import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    // private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(AuthDto: AuthDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: AuthDto.email,
      },
    });

    if (findUser) {
      return JSON.stringify({
        Message: `Email ${AuthDto.email} already registerd. Please Login!`,
      });
    }
    const passwordHash = await argon.hash(AuthDto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: AuthDto.email,
          full_name: AuthDto.full_name,
          password: passwordHash,
        },
      });
      return JSON.stringify({
        StatusCode: 201,
        Message: `User Created for ${AuthDto.email}`,
        CreatedUser: user,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('User does not exist');
    }
    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      return JSON.stringify({
        Message: `Password Not Matched!.`,
      });
    }
    return user;
  }
}
