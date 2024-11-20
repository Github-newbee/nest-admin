import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1732089368665 implements MigrationInterface {
  name = 'Generate1732089368665'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_device\` CHANGE \`online\` \`online\` tinyint NOT NULL COMMENT '是否在线' DEFAULT '1'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_device\` CHANGE \`online\` \`online\` tinyint NOT NULL COMMENT '是否在线' DEFAULT '0'`)
  }
}
