import { Injectable } from '@angular/core';
import { BaseCrud } from 'src/app/base/base-crud';
import { SqlLiteService } from 'src/app/services/sql/sql-lite.service';
import { ItensCompras } from 'src/app/services/sql/tables-consts';

@Injectable()
export class CheckItemsBuyService implements BaseCrud {
  constructor(private db: SqlLiteService) {}

  async all(idCompra: number): Promise<ItensCompras[]> {
    return this.db.query(
      'SELECT id,produto,comprado,valor FROM ITENS_COMPRAS WHERE ID_COMPRA = ?',
      [idCompra]
    );
  }
  async delete(id: number): Promise<any> {}

  async marcaItenCompra(id: number, comprado: boolean): Promise<any> {
    return this.db.query('UPDATE ITENS_COMPRAS SET COMPRADO = ? WHERE ID=?', [
      comprado,
      id,
    ]);
  }
}
