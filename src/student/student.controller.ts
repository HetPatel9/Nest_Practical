import { Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getStudentProfile(@Req() req: Request) {
    return req['student'];
  }

  @Patch('/:id')
  updateStudentById() {
    return 'working';
  }

  @Delete('/:id')
  deleteStudentById() {
    return 'working';
  }
}