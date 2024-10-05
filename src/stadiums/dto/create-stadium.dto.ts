import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateStadiumDto {
    @ApiProperty({ description: "Category ID", example: 1 })
    @IsNumber()
    @IsNotEmpty()
  category_id: number;

  @ApiProperty({ description: "Owner ID", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  owner_id: number;

  @ApiProperty({ description: "Contact with", example: "Admin" })
  @IsNotEmpty()
  @IsString()
  contact_with: string;

  @ApiProperty({ description: "Name of stadium", example: "Stadium 1" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "Volume", example: "5000" })
  @IsNotEmpty()
  @IsString()
  volume: string;

  @ApiProperty({ description: "Address", example: "Street 1" })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: "Region ID", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  region_id: number;

  @ApiProperty({ description: "District ID", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  district_id: number;

  @ApiProperty({ description: "Location", example: "Location 1" })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: "Stadium build date", example: "2022-06-13" })
  @IsNotEmpty()
  @IsString()
  buildAt: Date;

  @ApiProperty({ description: "Start time", example: "10:00" })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({ description: "End time", example: "12:00" })
  @IsNotEmpty()
  @IsString()
  end_time: string;
}
