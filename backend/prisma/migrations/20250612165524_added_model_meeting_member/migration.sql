-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "meethingId" TEXT NOT NULL,
    "hoster" INTEGER NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "meethingId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_meethingId_key" ON "Meeting"("meethingId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberId_key" ON "Member"("memberId");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_hoster_fkey" FOREIGN KEY ("hoster") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_meethingId_fkey" FOREIGN KEY ("meethingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
