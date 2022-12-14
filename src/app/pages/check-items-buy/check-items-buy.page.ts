import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
import { BaseList } from 'src/app/base/base-list';
import { AlertService } from 'src/app/services/alert.service';
import { ItensCompras } from 'src/app/services/sql/tables-consts';
import { CheckItemsBuyService } from './check-items-buy.service';

@Component({
  selector: 'app-check-items-buy',
  templateUrl: './check-items-buy.page.html',
  styleUrls: ['./check-items-buy.page.scss'],
})
export class CheckItemsBuyPage implements BaseList {
  public list: ItensCompras[] = [];
  public search = '';
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private http: CheckItemsBuyService,
    private router: Router,
    private alert: AlertService
  ) {
    this.id = Number(this.route.snapshot.params.id);
  }

  ionViewWillEnter(): void {
    this.all(this.search);
  }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
  }

  async all(search: string): Promise<void> {
    const data = await this.http.all(this.id);
    this.list = data
      .map((el: any) => {
        el.comprado = el.comprado === 'false' ? false : true;
        return el;
      })
      .filter(
        (el: ItensCompras) =>
          el.produto.toUpperCase().indexOf(search.toUpperCase()) !== -1
      );
  }

  async updateIten(obj: ItensCompras): Promise<void> {
    await this.http.marcaItenCompra(obj.id, obj.comprado);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  async finalizarCompra(): Promise<void> {
    const hasNoBuyed = this.list.some((el) => !el.comprado);
    let isConfirmed = true;
    if (hasNoBuyed) {
      const params = {
        header:
          'Alguns itens não foram comprados. Deseja Finalizar a compra mesmo assim?',
      };
      isConfirmed = await this.alert.presentActionSheet(params);
    }
    if (isConfirmed) {
      await this.http.finalizarCompra(this.id);
      this.router.navigate(['/tabs/list-buys/default']);
    }
  }

  async onSearch(event: { detail: { value: string } }): Promise<void> {
    await this.all(event.detail.value);
  }

  countBuyed(): number {
    return this.list.filter((el) => el.comprado).length;
  }

  countNotBuyed(): number {
    return this.list.filter((el) => !el.comprado).length;
  }
}
