/*
  Warnings:

  - Added the required column `usuario_id` to the `contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contas" ADD COLUMN     "usuario_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "lojas" ADD COLUMN     "usuario_id" BIGINT;

-- AlterTable
ALTER TABLE "transacoes" ADD COLUMN     "usuario_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lojas" ADD CONSTRAINT "lojas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
