import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateCartDto {
  @ApiProperty({ description: "User ID", example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: "User Wallet ID", example: 1 })
  @IsNumber()
  user_wallet_id: number;

  @ApiProperty({ description: "Stadium ID", example: 1 })
  @IsNumber()
  st_times_id: number;

  @ApiProperty({ description: "Date", example: "2024-09-26" })
  date: Date;

  @ApiProperty({ description: "Created at", example: "2024-09-26" })
  createdAt: Date;

  @ApiProperty({ description: "Time for clear", example: "2024-09-26" })
  time_for_clear: Date;

  @ApiProperty({ description: "Status", example: "active" })
  @IsNotEmpty()
  @IsString()
  status: string;
}
