import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { MailService } from "../mail/mail.service";
import { SignInDto } from "./dto/signin.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
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
    return {
      access_token,
      refresh_token,
    };
  }

  async signOut(user: User) {
    await this.userModel.update(
      { hashed_refresh_token: null },
      { where: { id: user.id } }
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

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.generateToken(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = uuid.v4();
    const updatedUser = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      {
        where: { id: newUser.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    const response = {
      message: "User registered",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return response;
  }

  async activateUser(link: string, res: Response) {
    try {
      const user = await this.userModel.findOne({
        where: { activation_link: link },
      });
      if (!user) {
        return res.status(400).send({ message: "Foydalanuvchi topilmadi!" });
      }

      if (user.is_active) {
        return res
          .status(400)
          .send({ message: "Foydalanuvchi allaqachon faollashtirilgan." });
      }

      user.is_active = true;
      await user.save();

      res.send({
        is_active: user.is_active,
        message: "Foydalanuvchi muvaffaqiyatli faollashtirildi.",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }

    const validPassword = await bcrypt.compare(password, user.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.generateToken(user);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Tizimga muvaffaqiyatli kirildi",
      access_token: tokens.access_token,
    };
  }

  findAll() {
    return this.userModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.userModel.findOne({
      where: { id },
      include:{all:true}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedUser[1][0];
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      return {message: `ID: ${id} does not exist in the database`};
    }
    await this.userModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
