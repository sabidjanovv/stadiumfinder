import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderModel: typeof Order){}
  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.orderModel.findOne({where:{id}, include: { all: true },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    })
    return order[1][0];
  }

  async remove(id: number) {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.orderModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
