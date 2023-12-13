import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateProductTable1698759075828 implements MigrationInterface {

    name = 'CreateProductTable1698759075828';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          create table products
          (
            id serial constraint groups_pk primary key,
            gender varchar null,
            publish varchar null,
            category varchar null,
            images varchar null,
            available int8 null,
            price_sale float8 null,
            taxes float8 null default 10,
            quantity float8 null default 80,
            inventory_type varchar null,
            code varchar null,
            description varchar null,
            new_label varchar null,
            sku varchar null,
            sale_label varchar null,
            name varchar null,
            price float8 null,
            cover_url varchar null,
            sub_description varchar null,
            colors varchar null,
            deleted_at timestamp default null,
            created_at timestamp default CURRENT_TIMESTAMP,
            updated_at timestamp default CURRENT_TIMESTAMP
          );
        `);
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "products"');
    }

}
