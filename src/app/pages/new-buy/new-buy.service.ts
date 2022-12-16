import { Injectable } from '@angular/core';
import { Compras, ItensCompras } from 'src/app/services/sql/tables-consts';

import { SqlLiteService } from '../../services/sql/sql-lite.service';
import { GET_ITENS_COMPRA } from '../check-items-buy/sql';
import { NewBuyModel } from './new-buy-model';
import {
  DELETE_ITENS_COMPRA,
  INSERT_COMPRA,
  INSERT_ITENS_COMPRA,
  UPDATE_COMPRA,
  UPDATE_ITENS_COMPRA,
} from './sql';

@Injectable({ providedIn: 'root' })
export class NewBuyService {
  constructor(private db: SqlLiteService) {}

  async saveCompra(
    description: string,
    itens: NewBuyModel[],
    idCompra: number
  ): Promise<any> {
    return new Promise<any>(async (resolve) => {
      if (!idCompra) {
        const insertId = await this.db.insert(INSERT_COMPRA, [description, 0]);
        idCompra = insertId;
      } else {
        await this.db.query(UPDATE_COMPRA, [description, idCompra]);
      }

      await this.insertOrUpdateItens(itens, idCompra);
      resolve(true);
    });
  }

  async all(idCompra: number): Promise<ItensCompras[]> {
    return this.db.query(GET_ITENS_COMPRA, [idCompra]);
  }

  async deleteItenCompra(id: number): Promise<any> {
    return this.db.delete(DELETE_ITENS_COMPRA, [id]);
  }

  private async insertOrUpdateItens(
    itensCompra: NewBuyModel[],
    idCompra: number
  ) {
    for (const item of itensCompra) {
      if (!item.id) {
        const params = [item.produto, item.valor, false, idCompra];
        await this.db.query(INSERT_ITENS_COMPRA, params);
      } else {
        const params = [item.produto, item.valor, item.id];
        await this.db.query(UPDATE_ITENS_COMPRA, params);
      }
    }
  }
}
