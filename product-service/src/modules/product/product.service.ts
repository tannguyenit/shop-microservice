import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}


  async getAllProduct(): Promise<any> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product').getMany();

    return queryBuilder;
  }

  async createProduct(payload: any): Promise<any> {
    const entity = this.productRepository.create(payload)
    return await this.productRepository.save(entity)
  }

  async getSingleProduct(id: number): Promise<ProductEntity> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id });

    const productEntity = await queryBuilder.getOne();

    if (!productEntity) {
      throw new NotFoundException();
    }

    return productEntity;
  }

  async deleteProduct(id: number): Promise<void> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id });

    const productEntity = await queryBuilder.getOne();

    if (!productEntity) {
      throw new NotFoundException();
    }

    await this.productRepository.remove(productEntity);
  }
}
