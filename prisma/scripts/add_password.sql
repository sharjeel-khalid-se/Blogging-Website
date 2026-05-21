ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;
-- Backfill existing users with an empty password or placeholder
UPDATE "User" SET "password" = '' WHERE "password" IS NULL;
-- Optionally, enforce NOT NULL if you want the column required afterwards
-- ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;