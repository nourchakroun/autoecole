import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }*/
  @Post('register')
  async register(
    @Body('cin') cin: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: number,
    @Body('lastName') lastName: string,
    @Body('firstName') firstName: string,
    @Body('birthdate') birthdate: Date,
    @Body('phoneNumber') phoneNumber: string,
    @Body('adress') adress: string,
    @Body('username') username: string,
  ) {
    const hashedpassword = await bcrypt.hash(password, 12);
    return this.userService.create({
      cin,
      email,
      password: hashedpassword,
      role,
      lastName,
      firstName,
      birthdate,
      phoneNumber,
      adress,
      username,
    });
  }
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new BadRequestException('Invalid Credentials !!1');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials !!2');
    }

    // generate a token
    return user;
  }
}
