export const REPORT_WEEK_SPENDING_SQL = `
SELECT 
    valor,
    dataFinalizacao 
FROM COMPRAS 
WHERE FINALIZADA = 1 AND dataFinalizacao BETWEEN ? AND ?`;

export const GET_ID_COMPRAS_FINALIZADAS = `
SELECT id,dataFinalizacao FROM COMPRAS 
WHERE FINALIZADA = 1 AND dataFinalizacao BETWEEN ? AND ?`;

export const REPORT_WEEK_ITENS_BUYEDS = `
SELECT COUNT(*) AS contador FROM ITENS_COMPRAS where id_compra= ?`;
