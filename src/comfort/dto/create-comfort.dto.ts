import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateComfortDto {
    @ApiProperty({
        description: "How is it?",
        example: "Comfortable"
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}
