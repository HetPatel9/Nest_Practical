import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { StudentModule } from 'src/student/students.module';
import { Student } from 'src/student/entity/student.entity';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forFeature([Student]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    AuthGuard,
  ],
  exports: [AuthGuard],
})
export class AuthModule {}