import { MigrationInterface, QueryRunner } from 'typeorm';
import AddressTypeModel from '../../models/customer/address.type.model';

export default class InsertDefaultAddressTypesValues1590353731398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(AddressTypeModel)
      .values([
        { label: 'Rural' },
        { label: 'Residencial' },
        { label: 'Comercial' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(AddressTypeModel)
      .where([
        { label: 'Rural' },
        { label: 'Residencial' },
        { label: 'Comercial' },
      ])
      .execute();
  }
}
