import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserCardDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber("UZ")
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @MinLength(16)
  number: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(2)
  @MinLength(2)
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(2)
  @MinLength(2)
  month: number;

  is_active: boolean;
  is_main: boolean;
}
