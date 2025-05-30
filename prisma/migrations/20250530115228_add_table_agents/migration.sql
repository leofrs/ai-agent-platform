-- CreateTable
CREATE TABLE "Agents" (
    "id" VARCHAR(11) NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agents" ADD CONSTRAINT "Agents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
