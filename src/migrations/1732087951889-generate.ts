import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1732087951889 implements MigrationInterface {
  name = 'Generate1732087951889'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`sys_site\` (\`id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(50) NOT NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`remark\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`client_user\` ADD \`balance\` int NOT NULL DEFAULT '0'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` ADD \`pay_status\` tinyint NULL DEFAULT '1'`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` ADD \`img_template_id\` bigint NULL`)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` ADD \`site_id\` bigint NULL`)
    await queryRunner.query(`ALTER TABLE \`sys_device\` ADD \`online\` tinyint NOT NULL COMMENT '是否在线' DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE \`sys_device\` ADD \`site_id\` bigint NULL`)
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`raw_img\` varchar(255) NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`client_user\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT ''`)
    await queryRunner.query(`ALTER TABLE \`client_user\` CHANGE \`remark\` \`remark\` varchar(255) NULL DEFAULT ''`)
    await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` tinyint NOT NULL DEFAULT '1'`)
    await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`remark\` \`remark\` varchar(255) NULL DEFAULT ''`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` ADD CONSTRAINT \`FK_d17802d388735dde509d1d30971\` FOREIGN KEY (\`img_template_id\`) REFERENCES \`sys_img_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` ADD CONSTRAINT \`FK_82cd7407b2dda2622baa50c6555\` FOREIGN KEY (\`site_id\`) REFERENCES \`sys_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`sys_device\` ADD CONSTRAINT \`FK_732fb26e45d23f89da2c50125ac\` FOREIGN KEY (\`site_id\`) REFERENCES \`sys_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_device\` DROP FOREIGN KEY \`FK_732fb26e45d23f89da2c50125ac\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` DROP FOREIGN KEY \`FK_82cd7407b2dda2622baa50c6555\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` DROP FOREIGN KEY \`FK_d17802d388735dde509d1d30971\``)
    await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`remark\` \`remark\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`)
    await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` tinyint NULL DEFAULT '1'`)
    await queryRunner.query(`ALTER TABLE \`client_user\` CHANGE \`remark\` \`remark\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`)
    await queryRunner.query(`ALTER TABLE \`client_user\` CHANGE \`phone\` \`phone\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`)
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`raw_img\``)
    await queryRunner.query(`ALTER TABLE \`sys_device\` DROP COLUMN \`site_id\``)
    await queryRunner.query(`ALTER TABLE \`sys_device\` DROP COLUMN \`online\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` DROP COLUMN \`site_id\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` DROP COLUMN \`img_template_id\``)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` DROP COLUMN \`pay_status\``)
    await queryRunner.query(`ALTER TABLE \`client_user\` DROP COLUMN \`balance\``)
    await queryRunner.query(`DROP TABLE \`sys_site\``)
  }
}
