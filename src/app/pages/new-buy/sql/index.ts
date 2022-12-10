export const INSERT_COMPRA = `INSERT INTO COMPRAS (descricao,valor,finalizada) VALUES (?,?,false)`;
export const INSERT_ITENS_COMPRA = `INSERT INTO ITENS_COMPRAS(
                                    produto,
                                    valor,
                                    comprado,
                                    id_compra,
                                    incluido_inicialmente) VALUES (?,?,?,?,1)`;
