import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateDistrictDto {
  @ApiProperty({
    description: "District name",
    example: "Chilonzor",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Region ID",
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;
}
