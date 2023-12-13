import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrderTable1698759075829 implements MigrationInterface {

    name = 'CreateOrderTable1698759075829';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          create table orders
          (
            id serial constraint order_pk primary key,
            shipping float8 not null default 0,
            sub_total float8 not null default 0,
            total_amount float8 not null default 0,
            total_items int8 not null default 0,
            total_quantity int8 not null default 0,
            discount int8 not null default 0,
            taxes int8 not null default 0,
            customer_id int8 not null default 0,
            items varchar null,
            delivery varchar null,
            shipping_address varchar null,
            status varchar null,
            deleted_at timestamp default null,
            created_at timestamp default CURRENT_TIMESTAMP,
            updated_at timestamp default CURRENT_TIMESTAMP
          );
        `);
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "orders"');
    }

}
