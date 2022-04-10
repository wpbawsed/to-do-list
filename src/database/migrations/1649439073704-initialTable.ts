import {MigrationInterface, QueryRunner} from "typeorm";

export class initialTable1649439073704 implements MigrationInterface {
    name = 'initialTable1649439073704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "password" character varying NOT NULL, "user_id" uuid, CONSTRAINT "REL_b00efea3fcea183b5dce555b12" UNIQUE ("user_id"), CONSTRAINT "PK_bcb51b2ce03a849342aa1d74807" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "block" boolean NOT NULL DEFAULT false, "roleId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "avatar" uuid, "user_id" uuid, CONSTRAINT "REL_d0c09ff9c4c561bce05722f449" UNIQUE ("avatar"), CONSTRAINT "REL_da404b5fd9c390e25338996e2d" UNIQUE ("user_id"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "to_do_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "member_id" uuid, CONSTRAINT "PK_e0a5c09514063e1646b4e109fa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "to-do-lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_system" boolean NOT NULL DEFAULT false, "group_id" uuid, "member_id" uuid, CONSTRAINT "PK_f8d3c7fc5cd8a8bf71fafa2f25a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."to_do_items_repeat_unit_enum" AS ENUM('day', 'week', 'month', 'year')`);
        await queryRunner.query(`CREATE TABLE "to_do_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "steps" text, "favorite" boolean NOT NULL DEFAULT false, "one_day" boolean NOT NULL DEFAULT false, "remind" boolean, "deadline" TIMESTAMP, "repeat_num" integer, "repeat_unit" "public"."to_do_items_repeat_unit_enum" NOT NULL, "remark" character varying NOT NULL DEFAULT '', "list_id" uuid, "member_id" uuid, CONSTRAINT "PK_c489335659b5b2f5a0d3ff98ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "line_login_configs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "channel_id" character varying NOT NULL, "channel_secret" character varying NOT NULL, "link_line_oa" character varying NOT NULL, "project" character varying NOT NULL, CONSTRAINT "PK_050b2f661ebb13614551d3669f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "controller" character varying NOT NULL, "action" character varying NOT NULL, "role_id" uuid, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "filename" character varying NOT NULL, "mimetype" character varying, "user_id" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "line_user_is" character varying NOT NULL, "user_id" uuid, CONSTRAINT "REL_7d64a83a28bbb950daa1079ef2" UNIQUE ("user_id"), CONSTRAINT "PK_a3a16132e71b519ab77bcb716f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_phone" ADD CONSTRAINT "FK_b00efea3fcea183b5dce555b126" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_d0c09ff9c4c561bce05722f4493" FOREIGN KEY ("avatar") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_da404b5fd9c390e25338996e2d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "to_do_groups" ADD CONSTRAINT "FK_616770f8fa43463a911d1849b07" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "to-do-lists" ADD CONSTRAINT "FK_f489785a03d0677f3a356422911" FOREIGN KEY ("group_id") REFERENCES "to_do_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "to-do-lists" ADD CONSTRAINT "FK_724d91c70211a5db88e1f6d7ca2" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "to_do_items" ADD CONSTRAINT "FK_423a5ec2a4405937b640b9c5cff" FOREIGN KEY ("list_id") REFERENCES "to-do-lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "to_do_items" ADD CONSTRAINT "FK_6e6178158e1a83c1e725cfa98b8" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_decdf86f650fb765dac7bd091a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_line" ADD CONSTRAINT "FK_7d64a83a28bbb950daa1079ef27" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_line" DROP CONSTRAINT "FK_7d64a83a28bbb950daa1079ef27"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_decdf86f650fb765dac7bd091a6"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_f10931e7bb05a3b434642ed2797"`);
        await queryRunner.query(`ALTER TABLE "to_do_items" DROP CONSTRAINT "FK_6e6178158e1a83c1e725cfa98b8"`);
        await queryRunner.query(`ALTER TABLE "to_do_items" DROP CONSTRAINT "FK_423a5ec2a4405937b640b9c5cff"`);
        await queryRunner.query(`ALTER TABLE "to-do-lists" DROP CONSTRAINT "FK_724d91c70211a5db88e1f6d7ca2"`);
        await queryRunner.query(`ALTER TABLE "to-do-lists" DROP CONSTRAINT "FK_f489785a03d0677f3a356422911"`);
        await queryRunner.query(`ALTER TABLE "to_do_groups" DROP CONSTRAINT "FK_616770f8fa43463a911d1849b07"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_da404b5fd9c390e25338996e2d1"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_d0c09ff9c4c561bce05722f4493"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "auth_phone" DROP CONSTRAINT "FK_b00efea3fcea183b5dce555b126"`);
        await queryRunner.query(`DROP TABLE "auth_line"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "line_login_configs"`);
        await queryRunner.query(`DROP TABLE "to_do_items"`);
        await queryRunner.query(`DROP TYPE "public"."to_do_items_repeat_unit_enum"`);
        await queryRunner.query(`DROP TABLE "to-do-lists"`);
        await queryRunner.query(`DROP TABLE "to_do_groups"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "auth_phone"`);
    }

}
