import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731487490911 implements MigrationInterface {
  name = 'Generate1731487490911'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`sys_device\` (\`id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(50) NOT NULL, \`mac\` varchar(50) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`remark\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`device_id\` bigint NULL`)
    await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_53d73b41df73692a59a8ff3a55f\` FOREIGN KEY (\`device_id\`) REFERENCES \`sys_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_53d73b41df73692a59a8ff3a55f\``)
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`device_id\``)
    await queryRunner.query(`DROP TABLE \`sys_device\``)
  }
}
