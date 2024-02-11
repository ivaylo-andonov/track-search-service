-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "name" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "isrc" TEXT NOT NULL,
    "release_date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);
