import { Injectable } from '@angular/core';
import { BaseCrud } from 'src/app/base/base-crud';
import { SqlLiteService } from 'src/app/services/sql/sql-lite.service';
import { ItensCompras } from 'src/app/services/sql/tables-consts';
import { FINALIZAR_COMPRA, GET_ITENS_COMPRA, UPDATE_ITENSCOMPRA } from './sql';

@Injectable()
export class CheckItemsBuyService implements BaseCrud {
  constructor(private db: SqlLiteService) {}

  async all(idCompra: number): Promise<ItensCompras[]> {
    return this.db.query(GET_ITENS_COMPRA, [idCompra]);
  }
  async delete(id: number): Promise<any> {}

  async marcaItenCompra(id: number, comprado: boolean): Promise<any> {
    return this.db.query(UPDATE_ITENSCOMPRA, [comprado, id]);
  }

  async finalizarCompra(idCompra: number): Promise<any> {
    return this.db.query(FINALIZAR_COMPRA, [idCompra]);
  }
}
