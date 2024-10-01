import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCardsService } from './user_cards.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCard } from './models/user_card.model';

@ApiTags("User Kartalari")
@Controller("user-cards")
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @ApiOperation({ summary: "User kartalarini yaratib qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create User Card",
    type: UserCard,
  })
  @Post()
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardsService.create(createUserCardDto);
  }


  @ApiOperation({ summary: "Barcha User kartalari ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Get all User Cards",
    type: [UserCard],
  })
  @Get()
  findAll() {
    return this.userCardsService.findAll();
  }


  @ApiOperation({ summary: "User kartasini ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Get User Card by ID",
    type: UserCard,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userCardsService.findOne(+id);
  }


  @ApiOperation({ summary: "User kartasini ID orqali o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update User Card by ID",
    type: UserCard,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserCardDto: UpdateUserCardDto
  ) {
    return this.userCardsService.update(+id, updateUserCardDto);
  }


  @ApiOperation({ summary: "User kartasini ID orqali o'chirish" })
  @ApiResponse({ status: 204, description: "Delete User Card by ID" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userCardsService.remove(+id);
  }
}
