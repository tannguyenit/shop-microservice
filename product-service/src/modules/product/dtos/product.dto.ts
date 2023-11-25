import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { ProductEntity } from '../product.entity';

export interface IProductDtoOptions {
}

export class ProductDto extends AbstractDto {
  constructor(entityName: ProductEntity, _?: IProductDtoOptions) {
    super(entityName);
  }
}
