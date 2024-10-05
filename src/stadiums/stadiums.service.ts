import { Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.model';

@Injectable()
export class StadiumsService {
  constructor(@InjectModel(Stadium) private stadiumModel: typeof Stadium){}
  create(createStadiumDto: CreateStadiumDto) {
    return this.stadiumModel.create(createStadiumDto);
  }

  findAll() {
    return this.stadiumModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.stadiumModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto): Promise<Stadium> {
    const stadium = await this.stadiumModel.update(updateStadiumDto,{
      where: { id },
      returning: true,
    })
    return stadium[1][0];
  }

  async remove(id: number) {
    const stadium = await this.stadiumModel.findByPk(id);

    if (!stadium) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.stadiumModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
