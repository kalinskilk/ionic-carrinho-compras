export const INSERT_COMPRA = `INSERT INTO COMPRAS (descricao,valor,finalizada) VALUES (?,?,false)`;
export const UPDATE_COMPRA = 'UPDATE COMPRAS SET descricao = ? WHERE ID = ?';
export const INSERT_ITENS_COMPRA = `INSERT INTO ITENS_COMPRAS(
                                    produto,
                                    valor,
                                    comprado,
                                    id_compra,
                                    incluido_inicialmente) VALUES (?,?,?,?,1)`;
export const UPDATE_ITENS_COMPRA = `UPDATE ITENS_COMPRAS SET
                                    produto = ?,
                                    valor = ?
                                    WHERE id=?`;
export const DELETE_ITENS_COMPRA = 'DELETE FROM ITENS_COMPRAS WHERE id = ?';
