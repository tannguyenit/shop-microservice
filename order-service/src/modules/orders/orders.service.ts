import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OrdersEntity } from './orders.entity';
import { UserEntity } from 'modules/user/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
  ) {}


  async getAllOrders(options: { user: UserEntity}): Promise<OrdersEntity[]> {
    return this.ordersRepository
      .createQueryBuilder('orders')
      .where('customer_id = :customerId', { customerId: options.user.id})
      .orderBy('id', 'DESC')
      .getMany();
  }

  async getSingleOrders(id: number): Promise<OrdersEntity> {
    const queryBuilder = this.ordersRepository
      .createQueryBuilder('orders')
      .where('orders.id = :id', { id });

    const ordersEntity = await queryBuilder.getOne();

    if (!ordersEntity) {
      throw new NotFoundException();
    }

    return ordersEntity;
  }

  async updateOrders(
    id: number,
    updateOrdersDto: any,
  ): Promise<void> {
    const queryBuilder = this.ordersRepository
      .createQueryBuilder('orders')
      .where('orders.id = :id', { id });

    const ordersEntity = await queryBuilder.getOne();

    if (!ordersEntity) {
      throw new NotFoundException();
    }

    this.ordersRepository.merge(ordersEntity, updateOrdersDto);

    await this.ordersRepository.save(updateOrdersDto);
  }

  async createOrders(
    data: any,
  ): Promise<any> {
    const user = this.ordersRepository.create(data);

    await this.ordersRepository.save(user);

    return user;
  }

  async deleteOrders(id: number): Promise<void> {
    await this.ordersRepository.softDelete(id)
  }
}
