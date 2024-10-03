import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "19244", description: "Adminning unical logini" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  login: string;

  @ApiProperty({
    example: "@admin2008",
    description: "Adminning telegram linki",
  })
  @IsString()
  @IsNotEmpty()
  tg_link: string;

  @ApiProperty({
    example: "admin123",
    description: "Adminning passwordi",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: "admin.png",
    description: "Adminning rasmi",
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: "false",
    description: "Adminning active yoki active emaslik statusi",
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: "false",
    description: "Adminning creator yoki creator emaslik statusi",
  })
  @IsBoolean()
  is_creator: boolean;
}
