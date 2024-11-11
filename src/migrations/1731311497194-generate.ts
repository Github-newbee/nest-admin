import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731311497194 implements MigrationInterface {
  name = 'Generate1731311497194'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`template_url\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`template_url\` varchar(255) NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`template_url\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`template_url\` varchar(200) NULL COMMENT '模板地图路径'`)
  }
}
