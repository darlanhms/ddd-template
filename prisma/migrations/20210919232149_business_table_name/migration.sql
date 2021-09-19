/*
  Warnings:

  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_ownerId_fkey";

-- DropTable
DROP TABLE "Business";

-- CreateTable
CREATE TABLE "business" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slogan" VARCHAR(255),
    "ownerId" UUID NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
