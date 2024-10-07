/*
  Warnings:

  - Added the required column `conta_id` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transacoes" ADD COLUMN     "conta_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
