import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731312351139 implements MigrationInterface {
  name = 'Generate1731312351139'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` CHANGE \`payed\` \`price\` decimal NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` CHANGE \`price\` \`price\` decimal(10,2) NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` CHANGE \`price\` \`price\` decimal NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`sys_img_bundles\` CHANGE \`price\` \`payed\` decimal NOT NULL`)
  }
}
