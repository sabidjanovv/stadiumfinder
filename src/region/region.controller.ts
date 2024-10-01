import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './models/region.model';

@ApiTags("Shahar yoki viloyatlar")
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: "Shahar/Viloyat qo'shish yoki yaratish" })
  @ApiResponse({
    status: 201,
    description: "Create Region",
    type: Region,
  })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }


  @ApiOperation({ summary: "Barcha Shahar/Viloyatni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Find All Regions",
    type: [Region],
  })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }


  @ApiOperation({ summary: "Shahar/Viloyatni ID orqali ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Find Region by ID",
    type: Region,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.regionService.findOne(+id);
  }


  @ApiOperation({ summary: "Shahar/Viloyatni ID orqali o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update Region by ID",
    type: Region,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }


  @ApiOperation({ summary: "Shahar/Viloyatni ID orqali o'chirish" })
  @ApiResponse({ status: 200, description: "Delete Region by ID" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.regionService.remove(+id);
  }
}
