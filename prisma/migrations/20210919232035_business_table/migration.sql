-- CreateTable
CREATE TABLE "Business" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slogan" VARCHAR(255),
    "ownerId" UUID NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
