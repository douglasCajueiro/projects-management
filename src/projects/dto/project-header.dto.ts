import { IsNotEmpty } from "class-validator";
export class ProjectHeaderDto {

    @IsNotEmpty()
    username: string
}