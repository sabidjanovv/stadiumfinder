import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './models/media.model';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Media]), FileModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
