import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtModel: typeof District){}
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtModel.create(createDistrictDto);
  }

  findAll() {
    return this.districtModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.districtModel.findByPk(id);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<District> {
    const district = await this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    })
    return district[1][0];
  }

  async remove(id: number) {
    const dsitrict = await this.districtModel.findByPk(id);

    if (!dsitrict) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.districtModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
