import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from './models/district.model';

@ApiTags("Tumanlar")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "Tuman qo'shish yoki yaratish" })
  @ApiResponse({
    status: 201,
    description: "Create District",
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: "Barcha Tumanlarni olish" })
  @ApiResponse({
    status: 201,
    description: "Get All Districts",
    type: District,
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: "Tumanni ID orqali olish" })
  @ApiResponse({
    status: 201,
    description: "Get District By ID",
    type: District,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.districtService.findOne(+id);
  }


  @ApiOperation({ summary: "Tumanni ID orqali o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update District",
    type: District,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }


  @ApiOperation({ summary: "Tumanni ID orqali o'chirish" })
  @ApiResponse({
    status: 204,
    description: "Delete District",
    type: District,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.districtService.remove(+id);
  }
}
