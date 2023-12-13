import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import type { OrdersDto } from './dtos/orders.dto';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dtos/order.create.dto';
import { UserEntity } from './../../modules/user/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { uniq } from 'lodash';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
    ) {}

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
    const allUserID = allOrder.map(i => i.customerId)
    const allUser = await lastValueFrom(this.userClient.send('get_user_by_ids', { ids: uniq(allUserID)}))
    
    return allOrder.map(i => {
      const user = allUser.find(u => u.id == i.customerId)
      if (!user) {
        return null
      }

      return {
        ...i,
        customer: {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          ipAddress: '127.0.0.1',
        }
      }
    })
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleOrders(@Param('id') id: number): Promise<OrdersDto> {
    const entity = await this.ordersService.getSingleOrders(id);

    const user = await lastValueFrom(this.userClient.send('get_user_by_ids', { ids: [entity.customerId]}))

    Object.assign(entity, { 
      orderNumber: `#${id}`,
      customer: {
        name: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
        ipAddress: '127.0.0.1',
      }
    })
    return entity;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteOrders(@Param('id') id: number): Promise<void> {
    await this.ordersService.deleteOrders(id);
  }
}
