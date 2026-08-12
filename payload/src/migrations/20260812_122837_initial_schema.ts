import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menu_items_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_pain_points_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_services_services_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_experience_and_trust_facts_type" AS ENUM('tags', 'images');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_testimonials_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_blog_posts_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_faq_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('homepage', 'blank');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('reference', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_menu_items_type" DEFAULT 'custom',
  	"url" varchar
  );
  
  CREATE TABLE "menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_floating_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"portrait_id" integer,
  	"avatars_image_id" integer,
  	"trust_text" varchar,
  	"trust_highlight" varchar,
  	"primary_button_label" varchar NOT NULL,
  	"primary_button_type" "enum_pages_blocks_hero_primary_button_type" DEFAULT 'custom',
  	"primary_button_url" varchar,
  	"secondary_button_label" varchar NOT NULL,
  	"secondary_button_type" "enum_pages_blocks_hero_secondary_button_type" DEFAULT 'custom',
  	"secondary_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_statement_and_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_statement_and_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pain_points_pain_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pain_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"closing_text" varchar,
  	"button_label" varchar NOT NULL,
  	"button_type" "enum_pages_blocks_pain_points_button_type" DEFAULT 'custom',
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"button_label" varchar NOT NULL,
  	"button_type" "enum_pages_blocks_services_services_button_type" DEFAULT 'custom',
  	"button_url" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_personal_relationship_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_personal_relationship" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_experience_and_trust_facts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_experience_and_trust_facts_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_experience_and_trust_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_pages_blocks_experience_and_trust_facts_type" DEFAULT 'tags'
  );
  
  CREATE TABLE "pages_blocks_experience_and_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"portrait_id" integer,
  	"bio" varchar,
  	"quote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_onboarding_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_onboarding_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"testimonials_mode" "enum_pages_blocks_testimonials_testimonials_mode" DEFAULT 'latest',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"posts_mode" "enum_pages_blocks_blog_posts_mode" DEFAULT 'latest',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar NOT NULL,
  	"button_type" "enum_pages_blocks_faq_button_type" DEFAULT 'custom',
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"background_image_id" integer,
  	"button_label" varchar NOT NULL,
  	"button_type" "enum_pages_blocks_cta_button_type" DEFAULT 'custom',
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"template" "enum_pages_template" DEFAULT 'blank',
  	"internal_name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"excerpt" varchar,
  	"featured_image_id" integer NOT NULL,
  	"author" varchar,
  	"published_date" timestamp(3) with time zone,
  	"read_time" varchar,
  	"content" jsonb,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"company" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"menu_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_organization_alternate_name" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_organization_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"given_name" varchar NOT NULL,
  	"family_name" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_organization_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"tagline" varchar,
  	"organization_logo_id" integer,
  	"organization_legal_name" varchar,
  	"organization_tax_id" varchar,
  	"organization_registration_number" varchar,
  	"organization_founding_date" timestamp(3) with time zone,
  	"organization_phone" varchar,
  	"organization_email" varchar,
  	"organization_address_street_address" varchar,
  	"organization_address_address_locality" varchar,
  	"organization_address_address_region" varchar,
  	"organization_address_postal_code" varchar,
  	"organization_address_address_country" varchar DEFAULT 'PL',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_menu_id" integer,
  	"cta_label" varchar NOT NULL,
  	"cta_type" "enum_header_cta_type" DEFAULT 'custom',
  	"cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_link_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"menu_id" integer NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_address_label" varchar DEFAULT 'Address',
  	"contact_address_value" varchar,
  	"contact_phone_label" varchar DEFAULT 'Phone',
  	"contact_phone_value" varchar,
  	"contact_email_label" varchar DEFAULT 'Email',
  	"contact_email_value" varchar,
  	"contact_hours_label" varchar DEFAULT 'Hours',
  	"contact_hours_value" varchar,
  	"copyright_text" varchar DEFAULT 'Sawicka Grzyb. All rights reserved.',
  	"legal_menu_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_rels" ADD CONSTRAINT "menu_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_rels" ADD CONSTRAINT "menu_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_rels" ADD CONSTRAINT "menu_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_floating_badges" ADD CONSTRAINT "pages_blocks_hero_floating_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_avatars_image_id_media_id_fk" FOREIGN KEY ("avatars_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_statement_and_statistics_stats" ADD CONSTRAINT "pages_blocks_trust_statement_and_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_statement_and_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_statement_and_statistics" ADD CONSTRAINT "pages_blocks_trust_statement_and_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pain_points_pain_points" ADD CONSTRAINT "pages_blocks_pain_points_pain_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pain_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pain_points" ADD CONSTRAINT "pages_blocks_pain_points_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pain_points" ADD CONSTRAINT "pages_blocks_pain_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_areas" ADD CONSTRAINT "pages_blocks_services_services_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_personal_relationship_features" ADD CONSTRAINT "pages_blocks_personal_relationship_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_personal_relationship"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_personal_relationship" ADD CONSTRAINT "pages_blocks_personal_relationship_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_personal_relationship" ADD CONSTRAINT "pages_blocks_personal_relationship_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust_facts_tags" ADD CONSTRAINT "pages_blocks_experience_and_trust_facts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experience_and_trust_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust_facts_images" ADD CONSTRAINT "pages_blocks_experience_and_trust_facts_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust_facts_images" ADD CONSTRAINT "pages_blocks_experience_and_trust_facts_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experience_and_trust_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust_facts" ADD CONSTRAINT "pages_blocks_experience_and_trust_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experience_and_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust" ADD CONSTRAINT "pages_blocks_experience_and_trust_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_experience_and_trust" ADD CONSTRAINT "pages_blocks_experience_and_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_onboarding_process_steps" ADD CONSTRAINT "pages_blocks_onboarding_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_onboarding_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_onboarding_process" ADD CONSTRAINT "pages_blocks_onboarding_process_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_onboarding_process" ADD CONSTRAINT "pages_blocks_onboarding_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_organization_alternate_name" ADD CONSTRAINT "site_settings_organization_alternate_name_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_organization_founders" ADD CONSTRAINT "site_settings_organization_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_organization_social_profiles" ADD CONSTRAINT "site_settings_organization_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_organization_logo_id_media_id_fk" FOREIGN KEY ("organization_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_main_menu_id_menu_id_fk" FOREIGN KEY ("main_menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_columns" ADD CONSTRAINT "footer_link_columns_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_columns" ADD CONSTRAINT "footer_link_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_legal_menu_id_menu_id_fk" FOREIGN KEY ("legal_menu_id") REFERENCES "public"."menu"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "menu_items_order_idx" ON "menu_items" USING btree ("_order");
  CREATE INDEX "menu_items_parent_id_idx" ON "menu_items" USING btree ("_parent_id");
  CREATE INDEX "menu_updated_at_idx" ON "menu" USING btree ("updated_at");
  CREATE INDEX "menu_created_at_idx" ON "menu" USING btree ("created_at");
  CREATE INDEX "menu_rels_order_idx" ON "menu_rels" USING btree ("order");
  CREATE INDEX "menu_rels_parent_idx" ON "menu_rels" USING btree ("parent_id");
  CREATE INDEX "menu_rels_path_idx" ON "menu_rels" USING btree ("path");
  CREATE INDEX "menu_rels_pages_id_idx" ON "menu_rels" USING btree ("pages_id");
  CREATE INDEX "menu_rels_posts_id_idx" ON "menu_rels" USING btree ("posts_id");
  CREATE INDEX "pages_blocks_hero_floating_badges_order_idx" ON "pages_blocks_hero_floating_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_floating_badges_parent_id_idx" ON "pages_blocks_hero_floating_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_portrait_idx" ON "pages_blocks_hero" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_hero_avatars_image_idx" ON "pages_blocks_hero" USING btree ("avatars_image_id");
  CREATE INDEX "pages_blocks_trust_statement_and_statistics_stats_order_idx" ON "pages_blocks_trust_statement_and_statistics_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_statement_and_statistics_stats_parent_id_idx" ON "pages_blocks_trust_statement_and_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_statement_and_statistics_order_idx" ON "pages_blocks_trust_statement_and_statistics" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_statement_and_statistics_parent_id_idx" ON "pages_blocks_trust_statement_and_statistics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_statement_and_statistics_path_idx" ON "pages_blocks_trust_statement_and_statistics" USING btree ("_path");
  CREATE INDEX "pages_blocks_pain_points_pain_points_order_idx" ON "pages_blocks_pain_points_pain_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_pain_points_pain_points_parent_id_idx" ON "pages_blocks_pain_points_pain_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pain_points_order_idx" ON "pages_blocks_pain_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_pain_points_parent_id_idx" ON "pages_blocks_pain_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pain_points_path_idx" ON "pages_blocks_pain_points" USING btree ("_path");
  CREATE INDEX "pages_blocks_pain_points_image_idx" ON "pages_blocks_pain_points" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_services_areas_order_idx" ON "pages_blocks_services_services_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_areas_parent_id_idx" ON "pages_blocks_services_services_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_image_idx" ON "pages_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_personal_relationship_features_order_idx" ON "pages_blocks_personal_relationship_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_personal_relationship_features_parent_id_idx" ON "pages_blocks_personal_relationship_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_personal_relationship_order_idx" ON "pages_blocks_personal_relationship" USING btree ("_order");
  CREATE INDEX "pages_blocks_personal_relationship_parent_id_idx" ON "pages_blocks_personal_relationship" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_personal_relationship_path_idx" ON "pages_blocks_personal_relationship" USING btree ("_path");
  CREATE INDEX "pages_blocks_personal_relationship_image_idx" ON "pages_blocks_personal_relationship" USING btree ("image_id");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_tags_order_idx" ON "pages_blocks_experience_and_trust_facts_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_tags_parent_id_idx" ON "pages_blocks_experience_and_trust_facts_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_images_order_idx" ON "pages_blocks_experience_and_trust_facts_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_images_parent_id_idx" ON "pages_blocks_experience_and_trust_facts_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_images_image_idx" ON "pages_blocks_experience_and_trust_facts_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_order_idx" ON "pages_blocks_experience_and_trust_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_and_trust_facts_parent_id_idx" ON "pages_blocks_experience_and_trust_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_and_trust_order_idx" ON "pages_blocks_experience_and_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_experience_and_trust_parent_id_idx" ON "pages_blocks_experience_and_trust" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experience_and_trust_path_idx" ON "pages_blocks_experience_and_trust" USING btree ("_path");
  CREATE INDEX "pages_blocks_experience_and_trust_portrait_idx" ON "pages_blocks_experience_and_trust" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_onboarding_process_steps_order_idx" ON "pages_blocks_onboarding_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_onboarding_process_steps_parent_id_idx" ON "pages_blocks_onboarding_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_onboarding_process_order_idx" ON "pages_blocks_onboarding_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_onboarding_process_parent_id_idx" ON "pages_blocks_onboarding_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_onboarding_process_path_idx" ON "pages_blocks_onboarding_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_onboarding_process_image_idx" ON "pages_blocks_onboarding_process" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_order_idx" ON "pages_blocks_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_parent_id_idx" ON "pages_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_path_idx" ON "pages_blocks_blog" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_og_image_idx" ON "pages" USING btree ("og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_og_image_idx" ON "posts" USING btree ("og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_og_image_idx" ON "categories" USING btree ("og_image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_menu_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_organization_alternate_name_order_idx" ON "site_settings_organization_alternate_name" USING btree ("_order");
  CREATE INDEX "site_settings_organization_alternate_name_parent_id_idx" ON "site_settings_organization_alternate_name" USING btree ("_parent_id");
  CREATE INDEX "site_settings_organization_founders_order_idx" ON "site_settings_organization_founders" USING btree ("_order");
  CREATE INDEX "site_settings_organization_founders_parent_id_idx" ON "site_settings_organization_founders" USING btree ("_parent_id");
  CREATE INDEX "site_settings_organization_social_profiles_order_idx" ON "site_settings_organization_social_profiles" USING btree ("_order");
  CREATE INDEX "site_settings_organization_social_profiles_parent_id_idx" ON "site_settings_organization_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_organization_organization_logo_idx" ON "site_settings" USING btree ("organization_logo_id");
  CREATE INDEX "header_main_menu_idx" ON "header" USING btree ("main_menu_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_link_columns_order_idx" ON "footer_link_columns" USING btree ("_order");
  CREATE INDEX "footer_link_columns_parent_id_idx" ON "footer_link_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_link_columns_menu_idx" ON "footer_link_columns" USING btree ("menu_id");
  CREATE INDEX "footer_legal_menu_idx" ON "footer" USING btree ("legal_menu_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu" CASCADE;
  DROP TABLE "menu_rels" CASCADE;
  DROP TABLE "pages_blocks_hero_floating_badges" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_trust_statement_and_statistics_stats" CASCADE;
  DROP TABLE "pages_blocks_trust_statement_and_statistics" CASCADE;
  DROP TABLE "pages_blocks_pain_points_pain_points" CASCADE;
  DROP TABLE "pages_blocks_pain_points" CASCADE;
  DROP TABLE "pages_blocks_services_services_areas" CASCADE;
  DROP TABLE "pages_blocks_services_services" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_personal_relationship_features" CASCADE;
  DROP TABLE "pages_blocks_personal_relationship" CASCADE;
  DROP TABLE "pages_blocks_experience_and_trust_facts_tags" CASCADE;
  DROP TABLE "pages_blocks_experience_and_trust_facts_images" CASCADE;
  DROP TABLE "pages_blocks_experience_and_trust_facts" CASCADE;
  DROP TABLE "pages_blocks_experience_and_trust" CASCADE;
  DROP TABLE "pages_blocks_onboarding_process_steps" CASCADE;
  DROP TABLE "pages_blocks_onboarding_process" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_blog" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_organization_alternate_name" CASCADE;
  DROP TABLE "site_settings_organization_founders" CASCADE;
  DROP TABLE "site_settings_organization_social_profiles" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_link_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_menu_items_type";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_button_type";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_button_type";
  DROP TYPE "public"."enum_pages_blocks_pain_points_button_type";
  DROP TYPE "public"."enum_pages_blocks_services_services_button_type";
  DROP TYPE "public"."enum_pages_blocks_experience_and_trust_facts_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_testimonials_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_mode";
  DROP TYPE "public"."enum_pages_blocks_faq_button_type";
  DROP TYPE "public"."enum_pages_blocks_cta_button_type";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_header_cta_type";`)
}
