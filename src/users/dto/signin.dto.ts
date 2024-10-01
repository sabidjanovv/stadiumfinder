import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "user1@gmail.com",
    description: "User emaili orqali signin qilish",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: "password123",
    description: "Parolni kiritish",
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
