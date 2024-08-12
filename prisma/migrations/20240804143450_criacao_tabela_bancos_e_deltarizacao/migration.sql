/*
  Warnings:

  - Added the required column `banco_id` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contas" ADD COLUMN     "banco_id" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "bancos" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "cod_febraban" INTEGER,
    "site" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "bancos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bancos_created_at_idx" ON "bancos"("created_at");

-- CreateIndex
CREATE INDEX "bancos_updated_at_idx" ON "bancos"("updated_at");

-- CreateIndex
CREATE INDEX "bancos_deleted_at_idx" ON "bancos"("deleted_at");

-- CreateIndex
CREATE INDEX "categorias_created_at_idx" ON "categorias"("created_at");

-- CreateIndex
CREATE INDEX "categorias_updated_at_idx" ON "categorias"("updated_at");

-- CreateIndex
CREATE INDEX "categorias_deleted_at_idx" ON "categorias"("deleted_at");

-- CreateIndex
CREATE INDEX "contas_created_at_idx" ON "contas"("created_at");

-- CreateIndex
CREATE INDEX "contas_updated_at_idx" ON "contas"("updated_at");

-- CreateIndex
CREATE INDEX "contas_deleted_at_idx" ON "contas"("deleted_at");

-- CreateIndex
CREATE INDEX "lojas_created_at_idx" ON "lojas"("created_at");

-- CreateIndex
CREATE INDEX "lojas_updated_at_idx" ON "lojas"("updated_at");

-- CreateIndex
CREATE INDEX "lojas_deleted_at_idx" ON "lojas"("deleted_at");

-- CreateIndex
CREATE INDEX "transacoes_created_at_idx" ON "transacoes"("created_at");

-- CreateIndex
CREATE INDEX "transacoes_deleted_at_idx" ON "transacoes"("deleted_at");

-- CreateIndex
CREATE INDEX "usuarios_created_at_idx" ON "usuarios"("created_at");

-- CreateIndex
CREATE INDEX "usuarios_updated_at_idx" ON "usuarios"("updated_at");

-- CreateIndex
CREATE INDEX "usuarios_deleted_at_idx" ON "usuarios"("deleted_at");

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_banco_id_fkey" FOREIGN KEY ("banco_id") REFERENCES "bancos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
