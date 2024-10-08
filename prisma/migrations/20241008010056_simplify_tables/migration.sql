/*
  Warnings:

  - You are about to drop the column `address` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the `adoption_requirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pet_photos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independency` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "adoption_requirement" DROP CONSTRAINT "adoption_requirement_petId_fkey";

-- DropForeignKey
ALTER TABLE "pet_photos" DROP CONSTRAINT "pet_photos_petId_fkey";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" TEXT NOT NULL,
DROP COLUMN "independency",
ADD COLUMN     "independency" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL;

-- DropTable
DROP TABLE "adoption_requirement";

-- DropTable
DROP TABLE "pet_photos";

-- DropEnum
DROP TYPE "PetEnergy";

-- DropEnum
DROP TYPE "PetEnvironment";

-- DropEnum
DROP TYPE "PetIndependency";

-- DropEnum
DROP TYPE "PetSize";
