import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response, Request } from 'express';
import { SignInDto } from "./dto/signin.dto";
import { CookieGetter } from "../decorators/cookieGetter.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { UserGuard } from "../guards/user.guard";



@ApiTags("Userlar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "User ro'yxattan o'tishi" })
  @ApiResponse({
    status: 201,
    description: "User signup",
    type: User,
  })
  @Post("signup")
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signUp(createUserDto, res);
  }

  @ApiOperation({ summary: "User tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "User signin",
    type: User,
  })
  @Post("signin")
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signIn(signInDto, res);
  }

  @ApiOperation({ summary: "User tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "User signout",
    type: User,
  })
  @Post("signout")
  async signOut(@Req() req: Request, @Res() res: Response) {
    try {
      res.clearCookie("refresh_token");
      return res
        .status(HttpStatus.OK)
        .json({ message: "Tizimdan muvaffaqiyatli chiqdingiz" });
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
    return this.usersService.refreshToken(id, refresh_token, res);
  }

  @ApiOperation({ summary: "Userni aktivlashtirish uchun link" })
  @Get("activate/:link")
  activateUser(@Param("link") link: string, @Res() res: Response) {
    return this.usersService.activateUser(link, res);
  }

  
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Barcha userlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Get All Users",
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Userni id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Get User by ID",
    type: User,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Userni id orqali tahrirlash" })
  @ApiResponse({
    status: 200,
    description: "Update User by ID",
    type: User,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Userni id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete User by ID",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}

