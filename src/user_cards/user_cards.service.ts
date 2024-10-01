import { Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './models/user_card.model';

@Injectable()
export class UserCardsService {
  constructor(@InjectModel(UserCard) private userCardModule: typeof UserCard){}
  create(createUserCardDto: CreateUserCardDto) {
    return this.userCardModule.create(createUserCardDto);
  }

  findAll() {
    return this.userCardModule.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.userCardModule.findOne({
      where:{id},
      include:{all:true}
    });
  }

  async update(id: number, updateUserCardDto: UpdateUserCardDto): Promise<UserCard> {
    const userCard = await this.userCardModule.update(updateUserCardDto, {
      where: { id },
      returning: true,
    })
    return userCard[1][0];
  }

  async remove(id: number) {
    const userCard = await this.userCardModule.findByPk(id);

    if (!userCard) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.userCardModule.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
