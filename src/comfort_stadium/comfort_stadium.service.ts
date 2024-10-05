import { Injectable } from '@nestjs/common';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ComfortStadium } from './models/comfort_stadium.model';

@Injectable()
export class ComfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium)
    private comfortStadiumModel: typeof ComfortStadium
  ) {}
  create(createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumModel.create(createComfortStadiumDto);
  }

  findAll() {
    return this.comfortStadiumModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.comfortStadiumModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(
    id: number,
    updateComfortStadiumDto: UpdateComfortStadiumDto
  ): Promise<ComfortStadium> {
    const comfortStadium = await this.comfortStadiumModel.update(
      updateComfortStadiumDto,
      {
        where: { id },
        returning: true,
      }
    );
    return comfortStadium[1][0];
  }

  async remove(id: number) {
    const comfortStadium = await this.comfortStadiumModel.findByPk(id);

    if (!comfortStadium) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.comfortStadiumModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
