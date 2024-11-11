import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731310286362 implements MigrationInterface {
  name = 'Generate1731310286362'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` CHANGE \`template_url\` \`templateUrl\` varchar(200) NULL COMMENT '模板地图路径'`)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP COLUMN \`create_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP COLUMN \`order\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP COLUMN \`orderNo\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP COLUMN \`update_by\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`templateUrl\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD \`order_no\` int NULL COMMENT '字典项排序'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`template_url\` varchar(200) NULL COMMENT '模板地图路径'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`templateUrl\` varchar(200) NULL COMMENT '模板地图路径'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`templateUrl\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` DROP COLUMN \`template_url\``)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` DROP COLUMN \`order_no\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` ADD \`templateUrl\` varchar(200) NULL COMMENT '模板地图路径'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD \`orderNo\` int NULL COMMENT '字典项排序'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD \`order\` int NULL COMMENT '字典项排序'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_item\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_role\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` ADD \`update_by\` int NULL COMMENT '更新者'`)
    await queryRunner.query(`ALTER TABLE \`sys_dept\` ADD \`create_by\` int NULL COMMENT '创建者'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_template\` CHANGE \`templateUrl\` \`template_url\` varchar(200) NULL COMMENT '模板地图路径'`)
  }
}
