import {
  ArrayField,
  ObjectField,
    StringField,
  } from '../../../decorators';
  
  export class OrderCreateDto {
    @StringField()
    readonly shipping!: string;

    @StringField()
    readonly subTotal!: string;

    @StringField()
    readonly totalAmount!: string;

    @StringField()
    readonly totalItems!: string;

    @StringField()
    readonly totalQuantity!: string;

    @StringField()
    readonly discount!: string;

    @ArrayField()
    readonly items!: string;

    @ObjectField()
    readonly shippingAddress!: string;
  }
  