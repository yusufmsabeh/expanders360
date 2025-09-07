import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitSchema1756724826671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'company_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'contact_email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['client', 'admin'],
            default: `'client'`,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'services_needed',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'budget',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: `'active'`,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'vendors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'countries_supported',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'services_offered',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'response_sla_hours',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'matches',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'score',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'project_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'vendor_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        uniques: [
          {
            name: 'unique_match_per_project_vendor',
            columnNames: ['project_id', 'vendor_id'],
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'projects',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'matches',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'matches',
      new TableForeignKey({
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendors',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'projects',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.dropForeignKey(
      'matches',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.dropForeignKey(
      'matches',
      new TableForeignKey({
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendors',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.dropTable('vendors');
    await queryRunner.dropTable('projects');
    await queryRunner.dropTable('admins');
    await queryRunner.dropTable('users');
  }
}
