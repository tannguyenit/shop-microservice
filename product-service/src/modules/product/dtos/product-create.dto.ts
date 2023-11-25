import {
  ArrayField,
  NumberField,
  ObjectField,
  StringField,
  URLField,
} from '../../../decorators';

export class ProductCreateDto {
  @StringField()
  readonly name!: string;

  @StringField()
  readonly gender!: string;

  @StringField()
  readonly category!: string;

  @NumberField()
  readonly available!: string;

  @NumberField({ nullable: true })
  readonly priceSale?: string | null;

  @NumberField()
  readonly taxes!: string;

  @NumberField()
  readonly quantity!: string;

  @ArrayField()
  readonly sizes!: string[];

  @ArrayField()
  readonly images!: string[];

  @ObjectField()
  readonly newLabel!: string;

  @ObjectField()
  readonly saleLabel!: string;

  @ArrayField()
  readonly colors!: string;

  @StringField()
  readonly inventoryType!: string;

  @StringField()
  readonly code!: string;

  @StringField()
  readonly description!: string;

  @StringField()
  readonly sku!: string;

  @NumberField()
  readonly price!: string;

  @URLField()
  readonly coverUrl!: string;

  @StringField()
  readonly subDescription!: string;
}
