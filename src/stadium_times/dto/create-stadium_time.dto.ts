import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateStadiumTimeDto {
    @ApiProperty({ description: "Stadium ID", example: 1 })
    @IsNumber()
    @IsNotEmpty()
    stadium_id: number;

    @ApiProperty({ description: "Start time", example: "12:00" })
    @IsNotEmpty()
    @IsString()
    start_time: string;

    @ApiProperty({ description: "End time", example: "14:00" })
    @IsNotEmpty()
    @IsString()
    end_time: string;

    @ApiProperty({ description: "Price", example: "1000" })
    @IsNotEmpty()
    @IsString()
    price: string;
}
