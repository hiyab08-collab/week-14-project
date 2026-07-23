-- CreateTable
CREATE TABLE "diet_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diet_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "cuisine_type" VARCHAR(100),
    "price_range" VARCHAR(4) NOT NULL DEFAULT '$$',
    "diet_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diet_types_name_key" ON "diet_types"("name");

-- CreateIndex
CREATE INDEX "restaurants_diet_type_id_idx" ON "restaurants"("diet_type_id");

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_diet_type_id_fkey" FOREIGN KEY ("diet_type_id") REFERENCES "diet_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
