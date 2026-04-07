-- CreateEnum
CREATE TYPE "JobSearchStatus" AS ENUM ('OPEN', 'PASSIVE', 'NOT_LOOKING');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "github" TEXT,
ADD COLUMN     "jobSearchStatus" "JobSearchStatus" NOT NULL DEFAULT 'NOT_LOOKING',
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "title" TEXT;
