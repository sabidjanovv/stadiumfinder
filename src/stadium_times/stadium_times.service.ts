import { Injectable } from '@nestjs/common';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StadiumTime } from './models/stadium_time.model';

@Injectable()
export class StadiumTimesService {
  constructor(@InjectModel(StadiumTime) private stadiumTimeModel: typeof StadiumTime) {}
  create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimeModel.create(createStadiumTimeDto);
  }

  findAll() {
    return this.stadiumTimeModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.stadiumTimeModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto): Promise<StadiumTime> {
    const stadiumTime = await this.stadiumTimeModel.update(updateStadiumTimeDto, {
      where: { id },
      returning: true,
    })
    return stadiumTime[1][0];
  }

  async remove(id: number) {
    const dsitrict = await this.stadiumTimeModel.findByPk(id);

    if (!dsitrict) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.stadiumTimeModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
