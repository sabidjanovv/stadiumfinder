import { Injectable } from "@nestjs/common";
import { CreateBotDto } from "./dto/create-bot.dto";
import { UpdateBotDto } from "./dto/update-bot.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Telegraf, Markup } from "telegraf";
import { Address } from "./models/address.model";
import { Car } from "./models/car.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Address) private addressModel: Address,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}
  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await this.botModel.create({
        user_id: userId,
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        lang: ctx.from.language_code,
      });
      await ctx.reply(
        `Iltimos, <b>"📱 Telefon raqamni yuboring" tugmasini bosing</b>`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📱 Telefon raqamni yuboring")],
          ])
            .resize()
            .oneTime(),
        }
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos, <b>"📱 Telefon raqamni yuboring" tugmasini bosing</b>`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📱 Telefon raqamni yuboring")],
          ])
            .resize()
            .oneTime(),
        }
      );
    } else {
      await ctx.reply(
        `Bu bot Stadion egalarini faollashtirish uchun ishlatilinadi`,
        {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        }
      );
    }
  }

  async onContact(ctx: Context) {
    if ("contact" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Iltimos, Start tugmasini bosing`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Iltimos, O'zingizni telefon raqamingizni yuboring!`, {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📱 Telefon raqamni yuboring")],
          ])
            .resize()
            .oneTime(),
        });
      } else {
        await this.botModel.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          {
            where: { user_id: userId },
          }
        );
        await ctx.reply(`Tabriklayman siz faollashtirildingiz`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else if (user.status) {
      await this.botModel.update(
        { status: false, phone_number: null },
        { where: { user_id: userId } }
      );
      await this.bot.telegram.sendChatAction(user.user_id, "typing");
      await ctx.reply(`Siz botdan chiqdingiz`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onAddress(ctx: Context) {
    await ctx.reply(`Manzillarim`, {
      parse_mode: "HTML",
      ...Markup.keyboard([
        ["Mening mazillarim", "Yangi manzil qo'shish"],
      ]).resize(),
    });
  }

  async addNewAddress(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await Address.create({
        user_id: userId,
        last_state:"address_name"
      });
      await ctx.reply(`Manzil nomini kiriting:`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard()
      });
    }
  }

  async onText(ctx: Context){
    if ("text" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        const address = await Address.findOne({
          where:{user_id:userId},
          order: [['id', 'DESC']]
        });
        if (address) {
          if (address.last_state == "address_name") {
            address.address_name = ctx.message.text;
            address.last_state = "address";
            await address.save();
            await ctx.reply(`Manzilni kiriting:`, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          } else if (address.last_state == "address") {
            address.address = ctx.message.text;
            address.last_state = "location";
            await address.save();
            await ctx.reply(`Manzilingiz lokatsiyasini yuboring:`, {
              parse_mode: "HTML",
              ...Markup.keyboard([
                [Markup.button.locationRequest("Lokatsiyani yuborish")],
              ])
                .resize()
                .oneTime(),
            });
          }
        }
          const car = await Car.findOne({
            where: { user_id: userId },
            order: [["id", "DESC"]],
          });
          if (car) {
            if (car.last_enter == "car_number") {
              car.car_number = ctx.message.text;
              car.last_enter = "model";
              await car.save();
              await ctx.reply(`Avtomobil modelini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_enter == "model") {
              car.model = ctx.message.text;
              car.last_enter = "color";
              await car.save();
              await ctx.reply(`Avtomobil rangini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_enter == "color") {
              car.color = ctx.message.text;
              car.last_enter = "year";
              await car.save();
              await ctx.reply(`Avtomobil yilini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else {
              car.year = ctx.message.text;
              car.last_enter = "finish";
              await car.save();
              await ctx.reply(`Avtomobil qo'shildi`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            }

        }
      }
    }
    
  }

  async onLocation(ctx: Context) {
    if ("location" in ctx.message) {

      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
        const address = await Address.findOne({
          where: { user_id: userId },
          order: [["id", "DESC"]],
        });
        if (address) {
          if (address.last_state == "location") {
            address.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
            address.last_state = "finish";
            await address.save();
            await ctx.reply(`Manzilingiz qo'shildi`, {
              parse_mode: "HTML",
              ...Markup.removeKeyboard(),
            });
          }
        }
      }
      // await ctx.reply(String(ctx.message.location.latitude));
      // await ctx.reply(String(ctx.message.location.longitude));
    }
  }

  async showAddresses(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      const addresses = await Address.findAll({ where: { user_id: userId } });
      addresses.forEach(async (address) => {
        await ctx.replyWithHTML(
          `<b>Manzil nomi:</b> ${address.address_name}\n<b>Manzil:</b> ${address.address}`,
          {
            reply_markup:{
              inline_keyboard:[[{ text:"Lokatsiyani ko'rish", callback_data:`location_${address.id}`}]]
            }
          }
        );
      });
    }
  }

  async onClickLocation(ctx: Context){
    try {
      const actText: String = ctx.callbackQuery["data"];
      const address_id = Number(actText.split("_")[1]);
      const address = await Address.findByPk(address_id);
        await ctx.replyWithLocation(
          Number(address.location.split(",")[0]),
          Number(address.location.split(",")[1])
        )
    } catch (error) {
      
    }
  }

  async onCar(ctx: Context){
    await ctx.reply(`Avtomobillarim:`, {
      parse_mode: "HTML",
      ...Markup.keyboard([
        ["Mening avtomobillarim", "Yangi avtomobil qo'shish"],
      ]).resize(),
    });
  }

  async addNewCar(ctx: Context){
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await Car.create({
        user_id: userId,
        last_enter:"car_number"
      });
      await ctx.reply(`Avtomobil raqamini kiriting:`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  // async onTextCar(ctx: Context){
  //   if ("text" in ctx.message) {
  //     const userId = ctx.from.id;
  //     const user = await this.botModel.findByPk(userId);
  //     if (!user) {
  //       await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
  //         parse_mode: "HTML",
  //         ...Markup.keyboard([["/start"]])
  //           .resize()
  //           .oneTime(),
  //       });
  //     } 
  //   }
  // }

  async showCars(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`Siz avval ro'yxattan o'tmagansiz`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else{
      const cars = await Car.findAll({ where: { user_id: userId } });
      cars.forEach(async (car) => {
        await ctx.replyWithHTML(
          `<b>Avtomobil raqami:</b> ${car.car_number}\n<b>Avtomobil model:</b> ${car.model}\n<b>Avtomobil rangi:</b> ${car.color}\n<b>Avtomobil yili:</b> ${car.year}`,
        );
      });
    }
  }

  async sendOtp(phone_number: string, OTP: string): Promise<boolean>{
    const user = await this.botModel.findOne({where:{phone_number}});

    if(!user || !user.status){
      return false;
    }

    await this.bot.telegram.sendChatAction(user.user_id, 'typing')

    await this.bot.telegram.sendMessage(user.user_id, "Verify OTP code: " + OTP);
    return true;
  }
}
