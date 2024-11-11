import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731309495254 implements MigrationInterface {
  name = 'Generate1731309495254'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`template_url\` varchar(200) NULL COMMENT '模板地图路径'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`template_url\``)
  }
}
