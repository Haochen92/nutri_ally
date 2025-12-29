-- AlterTable
ALTER TABLE "SavedMeals" ADD COLUMN     "meal_macros" JSONB NOT NULL DEFAULT '{}';
