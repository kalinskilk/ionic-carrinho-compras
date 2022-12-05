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
  constructor(
    private http: ListBuysService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ionViewWillEnter(): void {
    this.all();
  }

  async all(): Promise<void> {
    this.list = await this.http.all();
  }

  getIdCompra(id: number): void {
    this.router.navigate(['/tabs/check-items-buy/', id]);
  }

  async onDeleteCompra(id: number): Promise<void> {
    console.log('delete', id);
    const del = await this.alertService.presentAlertConfirm(
      'Atenção',
      'Deseja deletar o produto?'
    );
    if (del) {
      const data = await this.http.delete(id);
      this.list = this.list.filter((el) => el.id !== id);
      await this.alertService.presentToast('Excluido com sucesso!');
    }
  }
}
