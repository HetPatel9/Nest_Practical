import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entity/student.entity';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/students.module';

@Module({
  imports: [
    StudentModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'het',
      password: 'hetsimform',
      database: 'nest',
      synchronize: true,
      entities: [Student],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}