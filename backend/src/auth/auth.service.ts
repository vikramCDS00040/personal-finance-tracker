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
  async signup(dto: AuthDto) {
    // Generate password hash
    const passwordHash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          full_name: dto.full_name,
          password: passwordHash,
        },
      });
      return user;
    } catch (error) {
      throw new Error('User does not exist', error);
    }
    return 'signup successful';
  }

  //   async signin(dto: AuthDto) {
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         email: dto.email,
  //       },
  //     });

  //     if (!user) {
  //       throw new Error('User does not exist');
  //     }
  //     const pwMatches = await argon.verify(user.password, dto.password);

  //     if (!pwMatches) {
  //       throw pwMatches;
  //     }
  //     return this.signToken(user.id, user.email);
  //   }

  //   async signToken(
  //     userId: number,
  //     email: string,
  //   ): Promise<{ access_token: string }> {
  //     const payload = {
  //       sub: userId,
  //       email,
  //     };
  //     const secret: string = this.config.get<string>('JWT_SECRET')!;
  //     if (!secret) {
  //       throw new Error('JWT_SECRET environment variable is needed');
  //     }
  //     const token = await this.jwt.signAsync(payload, {
  //       expiresIn: '15m',
  //       secret: secret,
  //     });
  //     return { access_token: token };
  //   }

  async GetUsers() {
    try {
      const users = this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Could not fetch users', error);
    }
  }
}
