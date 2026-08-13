import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pain_points_pain_points" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "pages_blocks_personal_relationship_features" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "pages_blocks_pain_points_pain_points" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_personal_relationship_features" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_pain_points_pain_points" ADD CONSTRAINT "pages_blocks_pain_points_pain_points_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_personal_relationship_features" ADD CONSTRAINT "pages_blocks_personal_relationship_features_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_pain_points_pain_points_icon_image_idx" ON "pages_blocks_pain_points_pain_points" USING btree ("icon_image_id");
  CREATE INDEX "pages_blocks_personal_relationship_features_icon_image_idx" ON "pages_blocks_personal_relationship_features" USING btree ("icon_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pain_points_pain_points" DROP CONSTRAINT "pages_blocks_pain_points_pain_points_icon_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_personal_relationship_features" DROP CONSTRAINT "pages_blocks_personal_relationship_features_icon_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_pain_points_pain_points_icon_image_idx";
  DROP INDEX "pages_blocks_personal_relationship_features_icon_image_idx";
  ALTER TABLE "pages_blocks_pain_points_pain_points" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "pages_blocks_personal_relationship_features" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "pages_blocks_pain_points_pain_points" DROP COLUMN "icon_image_id";
  ALTER TABLE "pages_blocks_personal_relationship_features" DROP COLUMN "icon_image_id";`)
}
