import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_global_cta_button_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_template" ADD VALUE 'text-page' BEFORE 'blank';
  CREATE TABLE "pages_blocks_text_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "global_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"background_image_id" integer,
  	"button_label" varchar NOT NULL,
  	"button_type" "enum_global_cta_button_type" DEFAULT 'custom',
  	"button_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "global_cta_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "use_global" boolean DEFAULT true;
  ALTER TABLE "categories" ADD COLUMN "heading" varchar;
  ALTER TABLE "categories" ADD COLUMN "description" varchar;
  ALTER TABLE "categories" ADD COLUMN "internal_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "favicon_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "blog_blog_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "blog_posts_per_page" numeric;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_link" varchar DEFAULT '/';
  ALTER TABLE "pages_blocks_text_page" ADD CONSTRAINT "pages_blocks_text_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faqs" ADD CONSTRAINT "posts_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_cta" ADD CONSTRAINT "global_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_cta_rels" ADD CONSTRAINT "global_cta_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."global_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_cta_rels" ADD CONSTRAINT "global_cta_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_cta_rels" ADD CONSTRAINT "global_cta_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_page_order_idx" ON "pages_blocks_text_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_page_parent_id_idx" ON "pages_blocks_text_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_page_path_idx" ON "pages_blocks_text_page" USING btree ("_path");
  CREATE INDEX "posts_faqs_order_idx" ON "posts_faqs" USING btree ("_order");
  CREATE INDEX "posts_faqs_parent_id_idx" ON "posts_faqs" USING btree ("_parent_id");
  CREATE INDEX "global_cta_background_image_idx" ON "global_cta" USING btree ("background_image_id");
  CREATE INDEX "global_cta_rels_order_idx" ON "global_cta_rels" USING btree ("order");
  CREATE INDEX "global_cta_rels_parent_idx" ON "global_cta_rels" USING btree ("parent_id");
  CREATE INDEX "global_cta_rels_path_idx" ON "global_cta_rels" USING btree ("path");
  CREATE INDEX "global_cta_rels_pages_id_idx" ON "global_cta_rels" USING btree ("pages_id");
  CREATE INDEX "global_cta_rels_posts_id_idx" ON "global_cta_rels" USING btree ("posts_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_cta_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text_page" CASCADE;
  DROP TABLE "posts_faqs" CASCADE;
  DROP TABLE "global_cta" CASCADE;
  DROP TABLE "global_cta_rels" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_favicon_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'blank'::text;
  DROP TYPE "public"."enum_pages_template";
  CREATE TYPE "public"."enum_pages_template" AS ENUM('homepage', 'blank');
  ALTER TABLE "pages" ALTER COLUMN "template" SET DEFAULT 'blank'::"public"."enum_pages_template";
  ALTER TABLE "pages" ALTER COLUMN "template" SET DATA TYPE "public"."enum_pages_template" USING "template"::"public"."enum_pages_template";
  DROP INDEX "site_settings_favicon_idx";
  DROP INDEX "header_logo_idx";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "button_label" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "use_global";
  ALTER TABLE "categories" DROP COLUMN "heading";
  ALTER TABLE "categories" DROP COLUMN "description";
  ALTER TABLE "categories" DROP COLUMN "internal_name";
  ALTER TABLE "site_settings" DROP COLUMN "favicon_id";
  ALTER TABLE "site_settings" DROP COLUMN "blog_blog_title";
  ALTER TABLE "site_settings" DROP COLUMN "blog_posts_per_page";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "logo_link";
  DROP TYPE "public"."enum_global_cta_button_type";`)
}
