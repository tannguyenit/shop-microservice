import { AfterLoad, BeforeInsert, Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { OrdersDto } from './dtos/orders.dto';
import { isString } from 'lodash';

@Entity({ name: 'orders' })
@UseDto(OrdersDto)
export class OrdersEntity extends AbstractEntity<OrdersDto> {
    @Column({ type: 'float8'})
    shipping?: number

    @Column({ type: 'float8'})
    subTotal?: number

    @Column({ type: 'float8'})
    totalAmount?: number

    @Column({ type: 'int8'})
    totalItems?: number

    @Column({ type: 'int8'})
    totalQuantity?: number

    @Column({ type: 'int8'})
    discount?: number

    @Column({ type: 'int8'})
    taxes?: number

    @Column({ type: 'int8'})
    customerId?: number

    @Column({ type: 'varchar'})
    delivery?: string

    @Column({ type: 'varchar'})
    items?: string

    @Column({ type: 'varchar'})
    shippingAddress?: string

    @Column({ type: 'varchar'})
    status?: string

    @AfterLoad()
    handlerAfterLoad() {
        this.items = isString(this.items) ? JSON.parse(this.items) : null
        this.delivery = isString(this.delivery) ? JSON.parse(this.delivery) : null
        this.shippingAddress = isString(this.shippingAddress) ? JSON.parse(this.shippingAddress) : null
    }

    @BeforeInsert()
    handleBeforeInsert()
    {
        this.items = this.items ? JSON.stringify(this.items) : ''
        this.delivery = this.delivery ? JSON.stringify(this.delivery) : ''
        this.shippingAddress = this.shippingAddress ? JSON.stringify(this.shippingAddress) : ''
    }
}
