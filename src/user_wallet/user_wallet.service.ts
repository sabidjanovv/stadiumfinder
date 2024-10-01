import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(@InjectModel(UserWallet) private userWalletModel: typeof UserWallet){}
  create(createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletModel.create(createUserWalletDto);
  }

  findAll() {
    return this.userWalletModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.userWalletModel.findOne({
      where: { id },
      include: { all:true }
    });
  }

  async update(id: number, updateUserWalletDto: UpdateUserWalletDto): Promise<UserWallet> {
    const userWallet = await this.userWalletModel.update(updateUserWalletDto, {
      where: { id },
      returning: true,
    })
    return userWallet[1][0];
  }

  async remove(id: number) {
    const userWallet = await this.userWalletModel.findByPk(id);

    if (!userWallet) {
      return `ID: ${id} does not exist in the database`;
    }

    await this.userWalletModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
