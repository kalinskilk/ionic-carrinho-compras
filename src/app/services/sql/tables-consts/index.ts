// eslint-disable-next-line max-len
const TABLE_COMPRAS = `CREATE TABLE IF NOT EXISTS COMPRAS(
                        id integer primary key AUTOINCREMENT NOT NULL,
                        descricao VARCHAR(255),
                        valor MONEY,
                        finalizada bit)`;
// eslint-disable-next-line max-len
const TABLE_ITENS = `CREATE TABLE IF NOT EXISTS ITENS_COMPRAS(
                    id integer primary key AUTOINCREMENT NOT NULL,
                    produto VARCHAR(255),
                    valor MONEY,
                    comprado BIT,
                    id_compra integer,
                    incluido_inicialmente BIT,
                    FOREIGN KEY(id_compra) REFERENCES COMPRAS(id))`;
export const TABLES = [TABLE_COMPRAS, TABLE_ITENS];

export class Compras {
  id: number;
  descricao: string;
  valor: number;
}

export class ItensCompras {
  id: number;
  produto: string;
  valor: number;
  comprado: boolean;
  idCompra: number;
  incluidoInicialmente: boolean;
}
