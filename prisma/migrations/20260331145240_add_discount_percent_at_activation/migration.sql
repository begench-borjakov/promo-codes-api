/*
  Warnings:

  - Added the required column `discountPercentAtActivation` to the `activations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activations" ADD COLUMN     "discountPercentAtActivation" INTEGER NOT NULL;
