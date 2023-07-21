import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignInDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/student/entity/student.entity';
import { StudentService } from 'src/student/student.service';
import { StudentDto } from 'src/student/dto/student.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private studentService: StudentService,
    private JwtService: JwtService,
  ) {}
  async signUp(studentData: StudentDto) {
    studentData.password = await bcrypt.hash(studentData.password, 10);
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async signIn(studentData: AuthSignInDto) {
    const student = await this.studentService.findUserByEmail(studentData.email);
    const isMatch = await bcrypt.compare(studentData.password, student.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return { token: await this.JwtService.signAsync({ ...student }), student };
  }
}