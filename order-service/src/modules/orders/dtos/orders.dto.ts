import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { OrdersEntity } from '../orders.entity';

export interface IOrdersDtoOptions {
}

export class OrdersDto extends AbstractDto {
  constructor(entityName: OrdersEntity, _?: IOrdersDtoOptions) {
    super(entityName);
  }
}
