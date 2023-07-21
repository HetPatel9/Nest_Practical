import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private userRepository: Repository<Student>,
  ) {}

  async findUserByEmail(email: string) {
    const [user] = await this.userRepository.findBy({ email });

    if (!user) {
      throw new NotFoundException('No user found with this email');
    }
    return user;
  }
}