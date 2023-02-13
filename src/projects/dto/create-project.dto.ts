import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateProjectDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    zip_code: number

    @ApiProperty()
    @IsNotEmpty()
    deadline: Date

    @ApiProperty()
    @IsNotEmpty()
    cost: number
}