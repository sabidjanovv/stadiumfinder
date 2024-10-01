import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserWalletDto {
  @ApiProperty({
    description: "User ID",
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  
  @ApiProperty({
    description: "Wallet raqami",
    example: 1234567,
  })
  @IsNumber()
  @IsNotEmpty()
  wallet: number;
}
