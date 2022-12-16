import { Injectable } from '@angular/core';
import {
  GET_ID_COMPRAS_FINALIZADAS,
  REPORT_WEEK_ITENS_BUYEDS,
  REPORT_WEEK_SPENDING_SQL,
} from './sql/reports';
import { SqlLiteService } from './sql/sql-lite.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private db: SqlLiteService) {}

  async reportWeekSpending(
    dataInicial: string,
    dataFinal: string
  ): Promise<{ label: string; value: number }[]> {
    const data: { dataFinalizacao: string; valor: number }[] =
      await this.db.query(REPORT_WEEK_SPENDING_SQL, [dataInicial, dataFinal]);
    return this.separateDaysAndValues(data);
  }

  async reportWeekItensBuyeds(
    dataInicial: string,
    dataFinal: string
  ): Promise<{ label: string; value: number }[]> {
    const listIdCompraFinalizadas: { id: number; dataFinalizacao: string }[] =
      await this.db.query(GET_ID_COMPRAS_FINALIZADAS, [dataInicial, dataFinal]);
    const arr: { label: string; value: number }[] = [];
    for (const item of listIdCompraFinalizadas) {
      const label = this.getDateAndMonth(item.dataFinalizacao);
      const listContador: { contador: number }[] = await this.db.query(
        REPORT_WEEK_ITENS_BUYEDS,
        [item.id]
      );
      const contador = listContador[0].contador;
      const hasInArr = arr.find((el) => el.label === label);
      if (hasInArr) {
        hasInArr.value += contador;
      } else {
        arr.push({ value: contador, label });
      }
    }
    return arr;
  }

  private separateDaysAndValues(
    data: { dataFinalizacao: string; valor: number }[]
  ): { label: string; value: number }[] {
    const arr: { label: string; value: number }[] = [];
    for (const item of data) {
      const label = this.getDateAndMonth(item.dataFinalizacao);
      const hasInArr = arr.find((el) => el.label === label);
      if (hasInArr) {
        hasInArr.value += item.valor;
      } else {
        arr.push({ label, value: item.valor });
      }
    }
    return arr;
  }

  private getDateAndMonth(dataFinalizacao: string): string {
    return dataFinalizacao
      .slice(5)
      .replace(/-/g, '/')
      .split('/')
      .reverse()
      .join('/');
  }
}
