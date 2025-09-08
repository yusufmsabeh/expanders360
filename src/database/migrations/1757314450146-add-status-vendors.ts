import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusVendors1757314450146 implements MigrationInterface {
  name = 'AddStatusVendors1757314450146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vendors\` ADD COLUMN \`status\` enum('expired','active') NOT NULL DEFAULT 'active'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`vendors\` DROP COLUMN \`status\``);
  }
}
