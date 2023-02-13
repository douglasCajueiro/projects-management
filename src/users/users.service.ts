import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({ data: createUserDto })
      const { name, username } = user;
      return { name, username }
    } catch (error) {
      throw new HttpException('Please choose a new username', HttpStatus.CONFLICT);
    }
  }

}
