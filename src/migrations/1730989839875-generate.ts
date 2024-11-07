import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1730989839875 implements MigrationInterface {
  name = 'Generate1730989839875'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`client_user\` (\`id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`openid\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`remark\` varchar(255) NULL, \`status\` tinyint NULL DEFAULT '1', UNIQUE INDEX \`IDX_c74f618b463782535ec56140af\` (\`openid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`tool_storage\` DROP COLUMN \`user_id\``)
    await queryRunner.query(`ALTER TABLE \`tool_storage\` ADD \`user_id\` varchar(255) NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tool_storage\` DROP COLUMN \`user_id\``)
    await queryRunner.query(`ALTER TABLE \`tool_storage\` ADD \`user_id\` bigint NULL`)
    await queryRunner.query(`DROP INDEX \`IDX_c74f618b463782535ec56140af\` ON \`client_user\``)
    await queryRunner.query(`DROP TABLE \`client_user\``)
  }
}
