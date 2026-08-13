import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_not_found_button_type" AS ENUM('reference', 'custom');
  CREATE TABLE "site_settings_not_found_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_hero_scroll_down_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_services_areas_of_support_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_blog_read_article_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_blog_load_more_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_post_faq_heading" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_post_back_button_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_post_table_of_contents_heading" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "interface_text_breadcrumb_home_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_tagline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_heading" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_button_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_button_type" "enum_site_settings_not_found_button_type" DEFAULT 'custom';
  ALTER TABLE "site_settings" ADD COLUMN "not_found_button_url" varchar;
  ALTER TABLE "site_settings_not_found_badges" ADD CONSTRAINT "site_settings_not_found_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_not_found_badges_order_idx" ON "site_settings_not_found_badges" USING btree ("_order");
  CREATE INDEX "site_settings_not_found_badges_parent_id_idx" ON "site_settings_not_found_badges" USING btree ("_parent_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_pages_id_idx" ON "site_settings_rels" USING btree ("pages_id");
  CREATE INDEX "site_settings_rels_posts_id_idx" ON "site_settings_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_not_found_badges" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_hero_scroll_down_label";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_services_areas_of_support_label";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_blog_read_article_label";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_blog_load_more_label";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_post_faq_heading";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_post_back_button_label";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_post_table_of_contents_heading";
  ALTER TABLE "site_settings" DROP COLUMN "interface_text_breadcrumb_home_label";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_tagline";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_heading";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_description";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_button_label";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_button_type";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_button_url";
  DROP TYPE "public"."enum_site_settings_not_found_button_type";`)
}
