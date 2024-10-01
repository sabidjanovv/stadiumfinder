import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWallet } from './models/user_wallet.model';


@ApiTags("User hamyonlari")
@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @ApiOperation({ summary:"User Hamyonini yaratib qo'shish" })
  @ApiResponse({
    status: 201,
    description: "User hamyonini yaratib qo'shish",
    type: UserWallet,
  })
  @Post()
  create(@Body() createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletService.create(createUserWalletDto);
  }


  @ApiOperation({ summary:"Barcha hamyonlarni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Barcha hamyonlarni ko'rish",
    type: [UserWallet],
  })
  @Get()
  findAll() {
    return this.userWalletService.findAll();
  }


  @ApiOperation({ summary:"ID orqali hamyonlarni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "ID orqali hamyonlarni ko'rish",
    type: UserWallet,  
    })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWalletService.findOne(+id);
  }


  @ApiOperation({ summary:"ID orqali hamyonni o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "ID orqali hamyonni o'zgartirish",
    type: UserWallet,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserWalletDto: UpdateUserWalletDto) {
    return this.userWalletService.update(+id, updateUserWalletDto);
  }


  @ApiOperation({ summary:"ID orqali hamyonni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "ID orqali hamyonni o'chirish",
    type: UserWallet,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userWalletService.remove(+id);
  }
}
