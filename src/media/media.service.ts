import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaModel: typeof Media) {}
  create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto);
  }

  findAll() {
    return this.mediaModel.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.mediaModel.findOne({
      where: { id },
      include: { all: true }
    });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
    return media[1][0];
  }

  async remove(id: number) {
    const media = await this.mediaModel.findByPk(id);

    if (!media) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.mediaModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
