/*
  Warnings:

  - The primary key for the `Meeting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `meethingId` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `meethingId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `meetingId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_meethingId_fkey";

-- DropIndex
DROP INDEX "Meeting_meethingId_key";

-- AlterTable
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_pkey",
DROP COLUMN "id",
DROP COLUMN "meethingId",
ADD COLUMN     "meetingId" TEXT NOT NULL,
ADD CONSTRAINT "Meeting_pkey" PRIMARY KEY ("meetingId");

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "meethingId",
ADD COLUMN     "meetingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("meetingId") ON DELETE RESTRICT ON UPDATE CASCADE;
