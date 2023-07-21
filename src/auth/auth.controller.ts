import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth.dto';
import { StudentDto } from 'src/student/dto/student.dto';

@Controller()
export class AuthController {
  constructor(private authMethod: AuthService) {}

  @Post('/signup')
  createStudent(@Body() data: StudentDto) {
    return this.authMethod.signUp(data);
  }

  @Post('/signin')
  async signInStudent(@Body() data: AuthSignInDto, @Res() res: Response) {
    const { token, student } = await this.authMethod.signIn(data);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json(student);
  }

  @Get('/signout')
  @UseGuards(AuthGuard)
  signOutStudent(@Res() res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Signed Out successfully' });
  }
}