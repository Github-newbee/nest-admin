import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1732088176906 implements MigrationInterface {
  name = 'Generate1732088176906'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` CHANGE \`pay_status\` \`status\` tinyint NULL DEFAULT '1'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` CHANGE \`status\` \`status\` tinyint NULL COMMENT '生成状态' DEFAULT '1'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT '1'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` CHANGE \`status\` \`pay_status\` tinyint NULL DEFAULT '1'`)
  }
}
