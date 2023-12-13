import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersEntity } from './orders.entity';
import { OrdersService } from './orders.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
