import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({ description: "Stadium ID", example: 1 })
  @IsNumber()
  stadium_id: number;

  @ApiProperty({ description: "Video URL", example: "photo.jpg" })
  photo: string;

  @ApiProperty({ description: "Description", example: "Stadium photo" })
  @IsString()
  description: string;
}
