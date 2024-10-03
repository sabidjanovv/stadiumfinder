import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  HttpStatus,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminSelfGuard } from "../guards/adminSelf.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";
import { Response, Request } from "express";
import { SignInDto } from "./dto/signin.dto"; // Ensure you have a SignInDto for admin sign-in
import { CookieGetter } from "../decorators/cookieGetter.decorator";
import { AdminCreatorGuard } from "../guards/adminCreator.guard";

@ApiTags("Adminlar")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Yangi admin qo'shish (is_creator yarata oladi)" })
  @ApiResponse({
    status: 201,
    description: "Create Admin",
    type: Admin,
  })
  @Post("signup")
  async signUp(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    const result = await this.adminService.signUp(createAdminDto, res);
    return res.status(201).json(result);
  }

  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Admin signin",
    type: Admin,
  })
  @Post("signin")
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    return this.adminService.signIn(signInDto, res);
  }

  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "Admin signout",
  })
  @Post("signout")
  async signOut(@Req() req: Request, @Res() res: Response) {
    try {
      res.clearCookie("refresh_token");
      return res
        .status(HttpStatus.OK)
        .json({ message: "Admin tizimdan muvaffaqiyatli chiqdi" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Xatolik yuz berdi" });
    }
  }

  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post("/refreshToken/:id")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.refreshToken(id, refresh_token, res);
  }

  @ApiOperation({ summary: "Barcha adminlar ro'yxatini ko'rish (is_creator)" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar ro'yxati",
    type: [Admin],
  })
  @UseGuards(AdminSelfGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Adminni id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Get Admin by ID",
    type: Admin,
  })
  @UseGuards()
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni id orqali tahrirlash" })
  @ApiResponse({
    status: 200,
    description: "Update Admin by ID",
    type: Admin,
  })
  @UseGuards()
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete Admin by ID",
  })
  @UseGuards()
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
