import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SequelizeModule } from "@nestjs/sequelize";
import { ComfortModule } from "./comfort/comfort.module";
import { join } from "node:path";
import { Comfort } from "./comfort/models/comfort.model";
import { DistrictModule } from "./district/district.module";
import { RegionModule } from "./region/region.module";
import { District } from "./district/models/district.model";
import { Region } from "./region/models/region.model";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/models/category.model";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { MailModule } from "./mail/mail.module";
import { UserCardsModule } from "./user_cards/user_cards.module";
import { UserCard } from "./user_cards/models/user_card.model";
import { UserWalletModule } from "./user_wallet/user_wallet.module";
import { UserWallet } from "./user_wallet/models/user_wallet.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { Admin } from "./admin/models/admin.model";
import { AdminModule } from "./admin/admin.module";
import { Bot } from "./bot/models/bot.model";
import { Address } from "./bot/models/address.model";
import { Car } from "./bot/models/car.model";
import { OtpModule } from "./otp/otp.module";
import { Otp } from "./otp/models/otp.model";
import { StadiumsModule } from "./stadiums/stadiums.module";
import { Stadium } from "./stadiums/models/stadium.model";
import { CartModule } from "./cart/cart.module";
import { Cart } from "./cart/models/cart.model";
import { StadiumTimesModule } from "./stadium_times/stadium_times.module";
import { StadiumTime } from "./stadium_times/models/stadium_time.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/models/order.model";
import { ComfortStadiumModule } from "./comfort_stadium/comfort_stadium.module";
import { ComfortStadium } from "./comfort_stadium/models/comfort_stadium.model";
import { CommentsModule } from "./comments/comments.module";
import { Comment } from "./comments/models/comment.model";
import { MediaModule } from "./media/media.module";
import { Media } from "./media/models/media.model";
import { SmsModule } from "./sms/sms.module";
import { SmsService } from "./sms/sms.service";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Comfort,
        District,
        Region,
        Category,
        User,
        UserCard,
        UserWallet,
        Admin,
        Bot,
        Address,
        Car,
        Otp,
        Stadium,
        Cart,
        StadiumTime,
        Order,
        ComfortStadium,
        Comment,
        Media
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ComfortModule,
    DistrictModule,
    RegionModule,
    CategoriesModule,
    UsersModule,
    MailModule,
    UserCardsModule,
    UserWalletModule,
    BotModule,
    AdminModule,
    OtpModule,
    StadiumsModule,
    CartModule,
    StadiumTimesModule,
    OrdersModule,
    ComfortStadiumModule,
    CommentsModule,
    MediaModule,
    SmsModule,
  ],
  controllers: [],
  providers: [SmsService],
})
export class AppModule {}
