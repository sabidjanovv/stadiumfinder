import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { SignInDto } from "./dto/signin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async signOut(admin: Admin) {
    await this.adminModel.update(
      { hashed_refresh_token: null },
      { where: { id: admin.id } }
    );
    return { message: "Siz muvaffaqiyatli chiqdingiz" };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!verified_token) {
        throw new UnauthorizedException("Unauthorized token");
      }
      if (id != verified_token.id) {
        throw new ForbiddenException("Forbidden admin");
      }
      const payload = { id: verified_token.id, role: verified_token.role };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
      return {
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signUp(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { login: createAdminDto.login },
    });

    if (admin) {
      throw new BadRequestException("Bunday admin mavjud");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.generateToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Admin muvaffaqiyatli ro'yxatdan o'tkazildi",
      admin: updatedAdmin,
      access_token: tokens.access_token,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { login, password } = signInDto;
    const admin = await this.adminModel.findOne({
      where: { login },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    const validPassword = await bcrypt.compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.generateToken(admin);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return res.json({
      message: "Tizimga muvaffaqiyatli kirildi",
      access_token: tokens.access_token,
    });
  }

  findAll() {
    return this.adminModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.adminModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const updatedAdmin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedAdmin[1][0];
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);

    if (!admin) {
      return { message: `ID: ${id} mavjud emas` };
    }
    await this.adminModel.destroy({ where: { id } });
    return { message: `ID: ${id} muvaffaqiyatli o'chirildi` };
  }
}
