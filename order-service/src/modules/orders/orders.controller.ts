import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import type { OrdersDto } from './dtos/orders.dto';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dtos/order.create.dto';
import { UserEntity } from './../../modules/user/user.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createOrders(@AuthUser() user: UserEntity, @Body() createOrdersDto: OrderCreateDto) {
    Object.assign(createOrdersDto, {
      customerId: user.id,
      taxes: 10,
      status: 'pending',
      delivery: {
        shipBy: "DHL",
        speedy:"Standard",
        trackingNumber :"SPX" + new Date().getTime()}
     })
    
    await this.ordersService.createOrders(createOrdersDto);

    return true;
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getAllOrders(@AuthUser() user: UserEntity): Promise<any> {
    const allOrder = await this.ordersService.getAllOrders({ user });
    return allOrder.map(i => {
      return {
        ...i,
        customer: {
          name: user.displayName,
          email: user.email,
          avatarUrl: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
          ipAddress: '192.158.1.38',
        }
      }
    })
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleOrders(@AuthUser() user: UserEntity, @Param('id') id: number): Promise<OrdersDto> {
    const entity = await this.ordersService.getSingleOrders(id);
    Object.assign(entity, { 
      orderNumber: `#${id}`,
      customer: {
        name: user.displayName,
        email: user.email,
        avatarUrl: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
        ipAddress: '192.158.1.38',
      }
    })
    return entity;
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateOrders(
    @Param('id') id: number,
    @Body() updateOrdersDto: any,
  ): Promise<void> {
    return this.ordersService.updateOrders(id, updateOrdersDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteOrders(@Param('id') id: number): Promise<void> {
    await this.ordersService.deleteOrders(id);
  }
}
