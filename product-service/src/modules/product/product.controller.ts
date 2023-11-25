import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../decorators';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dtos/product-create.dto';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/list')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<any> {
    const products = await this.productService.getAllProduct();
    return { products }
  }

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async createProduct(@Body() payload: ProductCreateDto): Promise<any> {
    Object.assign(payload, { publish: 'published'})
    return await this.productService.createProduct(payload);
  }

  @Get('/:id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('id') id: number): Promise<any> {
    const product = await this.productService.getSingleProduct(id);

    return { product };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
