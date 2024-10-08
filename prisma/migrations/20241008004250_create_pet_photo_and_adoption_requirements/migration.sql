/*
  Warnings:

  - You are about to drop the column `created_at` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pets` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "adoption_requirement" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "adoption_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_photos" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "link" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adoption_requirement" ADD CONSTRAINT "adoption_requirement_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
