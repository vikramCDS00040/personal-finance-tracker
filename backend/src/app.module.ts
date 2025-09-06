import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule as configModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    PrismaModule,
    AuthModule,
    configModule.forRoot({ isGlobal: true }),
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
