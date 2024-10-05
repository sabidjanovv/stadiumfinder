import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ description: "User ID", example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: "Stadium ID", example: 1 })
  @IsNumber()
  stadium_id: number;

  @ApiProperty({ description: "Comment text", example: "Great stadium!" })
  @IsString()
  impression: string;
}
