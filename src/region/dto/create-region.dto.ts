import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({
    description: "District name",
    example: "Chilonzor",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
