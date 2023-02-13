import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

    readonly id: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;
}