-- CreateTable
CREATE TABLE "SavedMeals" (
    "userId" TEXT NOT NULL,
    "meal_type" TEXT NOT NULL,
    "meal_name" TEXT NOT NULL,
    "meal_items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedMeals_pkey" PRIMARY KEY ("userId","meal_name")
);

-- AddForeignKey
ALTER TABLE "SavedMeals" ADD CONSTRAINT "SavedMeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
