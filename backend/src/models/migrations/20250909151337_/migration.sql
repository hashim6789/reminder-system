-- CreateEnum
CREATE TYPE "public"."AuditType" AS ENUM ('reminder', 'delete', 'create', 'update', 'toggle');

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "public"."AuditType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
