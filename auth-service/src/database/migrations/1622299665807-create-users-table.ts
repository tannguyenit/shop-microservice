import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
  name = 'createUsersTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table users
        (
          id serial constraint users_pk primary key,
          email varchar not null,
          password varchar not null,

          display_name varchar not null,
          photo_url varchar null,
          phone_number varchar null,
          country varchar null,
          address varchar null,
          state varchar null,
          city varchar null,
          zip_code varchar null,
          about varchar null,
          role varchar null,
          is_public int null,

          deleted_at timestamp default NULL,
          created_at timestamp default CURRENT_TIMESTAMP,
          updated_at timestamp default CURRENT_TIMESTAMP
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
