import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsService } from './projects/projects.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule, UsersModule, ProjectsModule],
  controllers: [UsersController, ProjectsController],
  providers: [UsersService, ProjectsService],
})
export class AppModule {}
