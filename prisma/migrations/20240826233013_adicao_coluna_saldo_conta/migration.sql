/*
  Warnings:

  - Added the required column `saldo` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contas" ADD COLUMN     "saldo" DOUBLE PRECISION NOT NULL;
