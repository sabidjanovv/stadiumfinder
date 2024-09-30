import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionModel: typeof Region){}
  create(createRegionDto: CreateRegionDto) {
    return this.regionModel.create(createRegionDto);
  }

  findAll() {
    return this.regionModel.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.regionModel.findByPk(id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    })
    return region[1][0];
  }

  async remove(id: number) {
    const region = await this.regionModel.findByPk(id);

    if (!region) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.regionModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
