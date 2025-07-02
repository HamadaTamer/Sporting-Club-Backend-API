import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO member (first_name, last_name, gender, birthdate, subscription_date)
      VALUES 
        ('John', 'Doe', 'male', '1990-01-15', '2023-01-01'),
        ('Jane', 'Smith', 'female', '1992-05-20', '2023-02-01')
    `);

    await queryRunner.query(`
      INSERT INTO sport (name, subscription_price, allowed_gender)
      VALUES 
        ('Tennis', 50, 'mix'),
        ('Swimming', 40, 'female')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM member`);
    await queryRunner.query(`DELETE FROM sport`);
  }
}