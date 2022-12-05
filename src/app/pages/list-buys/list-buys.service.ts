import { Injectable } from '@angular/core';
import { BaseCrud } from 'src/app/base/base-crud';
import { SqlLiteService } from 'src/app/services/sql/sql-lite.service';
import { Compras } from 'src/app/services/sql/tables-consts';

@Injectable()
export class ListBuysService implements BaseCrud {
  constructor(private db: SqlLiteService) {}

  async all(): Promise<Compras[]> {
    return this.db.query('SELECT descricao,id FROM COMPRAS', []);
  }

  async delete(id: number): Promise<any> {
    await this.db.delete('delete from itens_compras where id_compra=?', [id]);
    return this.db.delete('delete from compras where id=?', [id]);
  }
}
