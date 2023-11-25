import { AfterLoad, BeforeInsert, Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IProductDtoOptions } from './dtos/product.dto';
import { ProductDto } from './dtos/product.dto';
import { isString } from 'lodash';

@Entity({ name: 'products' })
@UseDto(ProductDto)
export class ProductEntity extends AbstractEntity<ProductDto, IProductDtoOptions> {
    @Column({ type: 'varchar'})
    gender?: string

    @Column({ type: 'varchar'})
    publish?: string

    @Column({ type: 'varchar'})
    category?: string

    @Column({ type: 'varchar'})
    images?: string | null

    @Column({ type: 'int8'})
    available?: number

    @Column({ type: 'float8'})
    priceSale?: number

    @Column({ type: 'float8'})
    taxes?: number

    @Column({ type: 'float8'})
    quantity?: number

    @Column({ type: 'varchar'})
    inventoryType?: string

    @Column({ type: 'varchar'})
    code?: string

    @Column({ type: 'varchar'})
    description?: string

    @Column({ type: 'varchar'})
    newLabel?: Object | string

    @Column({ type: 'varchar'})
    sku?: string

    @Column({ type: 'varchar'})
    saleLabel?: Object | string

    @Column({ type: 'varchar'})
    name?: string

    @Column({ type: 'varchar'})
    price?: string

    @Column({ type: 'varchar'})
    coverUrl?: string

    @Column({ type: 'varchar'})
    subDescription?: string

    @Column({ type: 'varchar'})
    colors?: Object | string

    @AfterLoad()
    handlerAfterLoad() {
        this.images = this.images ? JSON.parse(this.images) : null
        this.newLabel = isString(this.newLabel) ? JSON.parse(this.newLabel) : null
        this.saleLabel = isString(this.saleLabel) ? JSON.parse(this.saleLabel) : null
        this.colors = isString(this.colors) ? JSON.parse(this.colors) : null
    }

    @BeforeInsert()
    handleBeforeInsert()
    {
        this.images = this.images ? JSON.stringify(this.images) : null
        this.newLabel = this.newLabel ? JSON.stringify(this.newLabel) : ''
        this.saleLabel = this.saleLabel ? JSON.stringify(this.saleLabel) : ''
        this.colors = this.colors ? JSON.stringify(this.colors) : ''
    }
}
