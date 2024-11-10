import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1731214644708 implements MigrationInterface {
  name = 'Generate1731214644708'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`clinet_user_id\` bigint NULL`)
    await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_70f6de2aa6c35558e11a8f2a78e\` FOREIGN KEY (\`clinet_user_id\`) REFERENCES \`client_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_70f6de2aa6c35558e11a8f2a78e\``)
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`clinet_user_id\``)
  }
}
