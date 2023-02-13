import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto, username: string) {

    try {
      const { zip_code: zipCode } = createProjectDto;
      await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    } catch (error) {
      throw new HttpException('Please inser a valid zip code (CEP)', HttpStatus.NOT_FOUND);
    }

    const { title, zip_code, deadline, cost } = createProjectDto;
    return this.prisma.project.create({ data: { title, zip_code, deadline, cost, username } });
  }

  async findAllByUser(username: string) {
    try {
      await (await this.prisma.user.findUnique({ where: { username: username } })).id
      return this.prisma.project.findMany({ where: { username: { equals: username } } });
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    const project = await this.prisma.project.findFirst({ where: { id } });

    if (!project) throw new HttpException('Project not found', HttpStatus.NOT_FOUND);

    const zipCode = project.zip_code;

    console.log(project.id)

    const cityAndState = await axios
      .get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then(response => {
        const { localidade: city, uf: state } = response.data;
        console.log(response.data)
        return `${city} - ${state}`
      })
      .catch(error => {
        throw new HttpException('Zipcode api temporarily unavailable, try again later', HttpStatus.SERVICE_UNAVAILABLE)
      });

      const { zip_code, ...otherProjectFields} = project

    return {...otherProjectFields, location: cityAndState}
  }

  async updateOne(updateProjectDto: UpdateProjectDto, id: string, username: string ) {
    const project = await this.prisma.project.findUnique({where: {id}});
    if (project.username !== username) throw new HttpException('User unauthorized to update this project', HttpStatus.UNAUTHORIZED)
    const updatedProject = await this.prisma.project.update({
      where: {id},
      data: updateProjectDto
    })
    return updatedProject;
  }

  async markAsDone(id: string, username: string ) {
    const project = await this.prisma.project.findUnique({where: {id}});
    if (project.username !== username) throw new HttpException('User unauthorized to update this project', HttpStatus.UNAUTHORIZED)
    const updatedProject = await this.prisma.project.update({
      where: {id},
      data: {done: true}
    })
    return updatedProject;
  }

  async remove(id: string, username: string) {
    const project = await this.prisma.project.findUnique({where: {id}});
    if (project.username !== username) throw new HttpException('User unauthorized to update this project', HttpStatus.UNAUTHORIZED)
    return this.prisma.project.delete({where: {id}});
  }
}
