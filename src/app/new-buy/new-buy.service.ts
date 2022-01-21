import { Injectable } from '@angular/core';

import { SqlLiteService } from '../services/sql/sql-lite.service';
import { NewBuyModel } from './new-buy-model';
import { INSERT_COMPRA, INSERT_ITENS_COMPRA, QUERY_ALL_COMPRAS } from './sql';

@Injectable({ providedIn: 'root' })
export class NewBuyService {
  constructor(private sql: SqlLiteService) {}

  async saveCompra(description: string, itens: NewBuyModel[]): Promise<any> {
    return new Promise<any>(async (resolve) => {
      const db = await this.sql.getDb();
      const compra = await db.executeSql(INSERT_COMPRA, [description, 0]);
      for (const item of itens) {
        await db.executeSql(INSERT_ITENS_COMPRA, [
          item.produto,
          item.valor,
          false,
          compra.insertId,
        ]);
      }
      resolve(true);
    });
  }

  async getAll(): Promise<any> {
    return new Promise<any>(async (resolve) => {
      const data = await this.sql.query(QUERY_ALL_COMPRAS, []);
      const produtos = [];
      for (let i = 0; i < data.rows.length; i += 1) {
        produtos.push(data.rows.item(i));
      }
      resolve(produtos);
    });
  }
}
