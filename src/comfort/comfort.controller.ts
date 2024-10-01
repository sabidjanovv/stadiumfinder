import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ComfortService } from "./comfort.service";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Comfort } from "./models/comfort.model";

@ApiTags("Komfortlar")
@Controller("comfort")
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: "Komfortlarni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Create Comfort",
    type: Comfort,
  })
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }


  @ApiOperation({ summary: "Komfortlarni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get All Comforts",
    type: [Comfort],
  })
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }


  @ApiOperation({ summary: "Komfortni Id orqali ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Get Comfort by Id",
    type: Comfort,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.comfortService.findOne(+id);
  }

  @ApiOperation({ summary: "Komfortni Id orqali o'zgartirish" })
  @ApiResponse({
    status: 200,
    description: "Update Comfort by Id",
    type: Comfort,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }


  @ApiOperation({ summary: "Komfortni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Comfort by Id",
    type: Comfort,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.comfortService.remove(+id);
  }
}
