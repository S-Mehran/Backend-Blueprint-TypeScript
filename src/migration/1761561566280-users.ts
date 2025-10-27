import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1761561566280 implements MigrationInterface {
    name = 'Users1761561566280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImage" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImage"`);
    }

}
