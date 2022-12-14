import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransacations1669423128496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                  name: 'value',
                  type: 'decimal',
                  precision: 10,
                  scale: 2,
                  isNullable: false,
              },
              {
                name: 'type',
                type: 'varchar',
                isNullable: false,
            },
            {
              name: 'category_id',
              type: 'uuid',
              isNullable: false,
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
                }
            ]
        })
    );
    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      name: 'CategoryTransaction',
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
  }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('transactions', 'CategoryTransaction');
      await queryRunner.dropTable('transactions');
  }
}
