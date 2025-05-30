-- CreateEnum
CREATE TYPE "MeetingsStatus" AS ENUM ('PENDENTE', 'CANCELADO', 'CONCLUIDO', 'EM_ANDAMENTO', 'AGENDADO');

-- AlterTable
ALTER TABLE "Agents" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Meetings" (
    "id" VARCHAR(11) NOT NULL,
    "name" TEXT NOT NULL,
    "status" "MeetingsStatus" NOT NULL DEFAULT 'AGENDADO',
    "transcript_url" TEXT,
    "record_url" TEXT,
    "summary" TEXT,
    "started_at" TIMESTAMPTZ(6),
    "ended_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "agent_id" VARCHAR(11) NOT NULL,

    CONSTRAINT "Meetings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
