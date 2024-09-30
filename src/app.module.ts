import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SequelizeModule } from "@nestjs/sequelize";
import { ComfortModule } from './comfort/comfort.module';
import { join } from "node:path";
import { Comfort } from './comfort/models/comfort.model';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/category.model';

@Module({
  imports: [
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
        Category
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ComfortModule,
    DistrictModule,
    RegionModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
