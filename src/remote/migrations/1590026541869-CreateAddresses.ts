import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateAddresses1590026541869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'details',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'int',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'zipCode',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'priority',
            type: 'int',
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey('addresses', new TableForeignKey({
      name: 'customerAddress',
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('addresses', 'customerAddress');
    await queryRunner.dropTable('addresses');
  }
}
