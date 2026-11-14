-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_plate_key" ON "cars"("plate");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cars"
ADD CONSTRAINT "cars_year_check"
CHECK ("year" BETWEEN 1950 AND 2030);