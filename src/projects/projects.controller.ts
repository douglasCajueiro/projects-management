import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post('/projects')
  create(@Body() createProjectDto: CreateProjectDto, @Headers('username') username: string) {
    return this.projectsService.create(createProjectDto, username);
  }

  @Get('/projects')
  findAllByUser(@Headers('username') username: string) {
    return this.projectsService.findAllByUser(username);
  }

  @Get('/project')
  findById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Put('/projects:id')
  updateOne(@Body() updateProjectDto: UpdateProjectDto, @Param('id') id: string, @Headers('username') username: string) {
    return this.projectsService.updateOne(updateProjectDto, id, username);
  }

  @Patch('/projects/:id/done')
  markAsDone(@Param('id') id: string, @Headers('username') username: string) {
    return this.projectsService.markAsDone(id, username);
  }

  @Delete('projects:id')
  remove(@Param('id') id: string, @Headers('username') username: string) {
    return this.projectsService.remove(id, username);
  }
}
