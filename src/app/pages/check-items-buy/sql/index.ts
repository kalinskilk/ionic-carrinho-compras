export const UPDATE_ITENSCOMPRA =
  'UPDATE ITENS_COMPRAS SET COMPRADO = ? WHERE ID=?';

export const GET_ITENS_COMPRA =
  'SELECT id,produto,comprado,valor FROM ITENS_COMPRAS WHERE ID_COMPRA = ?';

export const FINALIZAR_COMPRA =
  'UPDATE COMPRAS SET finalizada = true WHERE id=?';
