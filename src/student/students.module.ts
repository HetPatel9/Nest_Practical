import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './entity/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, AuthGuard],
  exports: [StudentService],
})
export class StudentModule {}