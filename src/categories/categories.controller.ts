import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Category } from './models/category.model';


@ApiTags("Kategoriyalar")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Yangi kategoriya qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create Category",
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }


  @ApiOperation({ summary: "Barcha Kategoriyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Get All Categories",
    type: [Category],
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }


  @ApiOperation({ summary: "Kategoriyani Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Get Category by ID",
    type: Category,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }


  @ApiOperation({ summary: "Kategoriyani Id orqali o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update Category by ID",
    type: Category,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }


  @ApiOperation({ summary: "Kategoriyani Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Category by ID",
    type: Category,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
