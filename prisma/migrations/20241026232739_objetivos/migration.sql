-- CreateTable
CREATE TABLE "objetivos" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "conta_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "objetivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "objetivos_created_at_idx" ON "objetivos"("created_at");

-- CreateIndex
CREATE INDEX "objetivos_updated_at_idx" ON "objetivos"("updated_at");

-- CreateIndex
CREATE INDEX "objetivos_deleted_at_idx" ON "objetivos"("deleted_at");

-- AddForeignKey
ALTER TABLE "objetivos" ADD CONSTRAINT "objetivos_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
