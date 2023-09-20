/*
  Warnings:

  - You are about to drop the `account_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account_settings" DROP CONSTRAINT "account_settings_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user_accounts" DROP CONSTRAINT "user_accounts_account_settings_id_fkey";

-- AlterTable
ALTER TABLE "user_accounts" ADD COLUMN     "comunication_emails" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifications" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "account_settings";
