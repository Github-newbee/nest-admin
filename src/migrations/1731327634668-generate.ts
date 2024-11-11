import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731327634668 implements MigrationInterface {
  name = 'Generate1731327634668'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`sys_img_ai\` (\`id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`model\` tinyint NOT NULL COMMENT '模型名称' DEFAULT '1', \`img_ai_url\` varchar(255) NULL COMMENT '图片链接', \`order_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` ADD CONSTRAINT \`FK_fe38c2d030202fb4abf19868132\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_ai\` DROP FOREIGN KEY \`FK_fe38c2d030202fb4abf19868132\``)
    await queryRunner.query(`DROP TABLE \`sys_img_ai\``)
    await queryRunner.query(`CREATE INDEX \`FK_70f6de2aa6c35558e11a8f2a78e\` ON \`order\` (\`client_user_id\`)`)
  }
}
