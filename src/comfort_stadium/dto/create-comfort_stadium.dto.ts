import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateComfortStadiumDto {
  @ApiProperty({ description: "Stadium ID", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  stadium_id: number;
  
  @ApiProperty({ description: "Comfort ID", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  comfort_id: number;
}
