import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortModel: typeof Comfort) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortModel.create(createComfortDto);
  }

  findAll() {
    return this.comfortModel.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.comfortModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(
    id: number,
    updateComfortDto: UpdateComfortDto
  ): Promise<Comfort> {
    const comfort = await this.comfortModel.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    console.log(comfort);
    return comfort[1][0];
  }

  async remove(id: number) {
    const comfort = await this.comfortModel.findByPk(id);

    if (!comfort) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.comfortModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
