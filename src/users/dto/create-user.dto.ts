import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

    readonly id: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly username: string;
}