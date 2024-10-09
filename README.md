# Como rodar

1. Adicione as variáveis de ambiente
2. Rode o comando `docker-compose up -d --build`
3. Troque a variável de ambiente do banco para o localhost
4. Rode o comando `npx prisma migrate deploy`
5. Rode o comando `npx prisma generate`
6. Rode o comando `npx ts-node prisma/seeds/bancos.seed.ts`