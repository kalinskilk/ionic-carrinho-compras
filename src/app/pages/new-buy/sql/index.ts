export const INSERT_COMPRA = `INSERT INTO COMPRAS (descricao,valor) VALUES (?,?)`;
export const INSERT_ITENS_COMPRA = `INSERT INTO ITENS_COMPRAS(produto,valor,comprado,id_compra) VALUES (?,?,?,?)`;
