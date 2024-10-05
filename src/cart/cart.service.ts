import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartModel:typeof Cart) {}
  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  findAll() {
    return this.cartModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.cartModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartModel.update(updateCartDto, {
      where: { id },
      returning: true,
    })
    return cart[1][0];
  }

  async remove(id: number) {
    const cart = await this.cartModel.findByPk(id);

    if (!cart) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.cartModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
