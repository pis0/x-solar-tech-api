import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1589750244407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}


// {
//   "id": "7309eb14-09bc-4d6b-be51-ccc8a7486665",
//   "name": "pis0",
//   "cpf": "050.450.309-66",
//   "phone": "+55.11.991195222",
//   "email": "msdraco@gmaill.com",
//   "address": {
//       "main": {
//           "id": "fe553c71-ec64-4cfb-afa9-fe57d922f62c",
//           "number": 0,
//           "street": "",
//           "details": "",
//           "type": 0,
//           "city": "",
//           "state": "",
//           "zipCode": "",
//           "country": ""
//       },
//       "others": []
//   }
// }
