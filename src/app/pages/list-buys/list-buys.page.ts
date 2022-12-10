import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from 'src/app/base/base-list';
import { AlertService } from 'src/app/services/alert.service';
import { Compras } from 'src/app/services/sql/tables-consts';
import { ListBuysService } from './list-buys.service';

@Component({
  selector: 'app-list-buys',
  templateUrl: './list-buys.page.html',
  styleUrls: ['./list-buys.page.scss'],
})
export class ListBuysPage implements BaseList {
  list: Compras[] = [];
  status: 'FINALIZADA' | 'NAO_FINALIZADA' = 'NAO_FINALIZADA';
  constructor(
    private http: ListBuysService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ionViewWillEnter(): void {
    this.all(this.status === 'FINALIZADA');
  }

  async all(finalizada = false): Promise<void> {
    this.list = await this.http.all(finalizada);
  }

  getIdCompra(id: number): void {
    this.router.navigate(['/tabs/check-items-buy/', id]);
  }

  async onDeleteCompra(id: number): Promise<void> {
    const params = {
      header: 'Deseja deletar esta compra?',
      subHeader: ' ',
    };
    const isConfirm = await this.alertService.presentActionSheet(params);
    if (isConfirm) {
      await this.http.delete(id);
      this.list = this.list.filter((el) => el.id !== id);
      await this.alertService.presentToast('Excluido com sucesso!');
    }
  }

  changeSegment(event: {
    detail: { value: 'FINALIZADA' | 'NAO_FINALIZADA' };
  }): void {
    const status = event.detail.value === 'FINALIZADA' ? true : false;
    this.status = event.detail.value;
    this.all(status);
  }
}
