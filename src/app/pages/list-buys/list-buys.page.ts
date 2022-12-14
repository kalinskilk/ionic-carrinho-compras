import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  mode: 'default' | 'list' = 'default';
  constructor(
    private http: ListBuysService,
    private router: Router,
    private alertService: AlertService,
    private activedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.mode = this.activedRoute.snapshot.params.mode;
    console.log(this.mode);
  }

  ionViewWillEnter(): void {
    this.all(this.status === 'FINALIZADA');
  }

  async all(finalizada = false): Promise<void> {
    this.list = await this.http.all(finalizada);
  }

  getIdCompra(obj: { id: number; descBuy: string }): void {
    let route = '/tabs/check-items-buy/';
    const params = [];
    if (this.mode === 'list') {
      route = '/tabs/new-buy/';
      params.push(route, obj.id, obj.descBuy);
    } else {
      params.push(route, obj.id);
    }

    this.router.navigate(params);
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

  goBack(): void {
    this.location.back();
  }
}
