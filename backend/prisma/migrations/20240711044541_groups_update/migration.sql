/*
  Warnings:

  - A unique constraint covering the columns `[join_code]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "join_code" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "join_code_unique" ON "Group"("join_code");
