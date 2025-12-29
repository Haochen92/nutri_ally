/*
  Warnings:

  - You are about to drop the `ProductNutrientsInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProductNutrientsInfo";

-- CreateTable
CREATE TABLE "product_nutrients_info" (
    "code" TEXT NOT NULL,
    "nutriscore_grade" TEXT NOT NULL,
    "nutriscore_score" DOUBLE PRECISION NOT NULL,
    "nova_group" DOUBLE PRECISION NOT NULL,
    "serving_size" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "product_name_main" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "energy" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "sugars" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturated_fat" DOUBLE PRECISION NOT NULL,
    "trans_fat" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,
    "potassium" DOUBLE PRECISION NOT NULL,
    "calcium" DOUBLE PRECISION NOT NULL,
    "iron" DOUBLE PRECISION NOT NULL,
    "magnesium" DOUBLE PRECISION NOT NULL,
    "phosphorus" DOUBLE PRECISION NOT NULL,
    "zinc" DOUBLE PRECISION NOT NULL,
    "vitamin_c" DOUBLE PRECISION NOT NULL,
    "vitamin_a" DOUBLE PRECISION NOT NULL,
    "vitamin_d" DOUBLE PRECISION NOT NULL,
    "vitamin_b6" DOUBLE PRECISION NOT NULL,
    "vitamin_b12" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_nutrients_info_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_nutrients_info_code_key" ON "product_nutrients_info"("code");
