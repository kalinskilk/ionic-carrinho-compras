import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
import { BaseList } from 'src/app/base/base-list';
import { ItensCompras } from 'src/app/services/sql/tables-consts';
import { CheckItemsBuyService } from './check-items-buy.service';

@Component({
  selector: 'app-check-items-buy',
  templateUrl: './check-items-buy.page.html',
  styleUrls: ['./check-items-buy.page.scss'],
})
export class CheckItemsBuyPage implements BaseList {
  public list: ItensCompras[] = [];

  private id: number;
  constructor(
    private route: ActivatedRoute,
    private http: CheckItemsBuyService
  ) {
    this.id = Number(this.route.snapshot.params.id);
  }

  ionViewWillEnter(): void {
    this.all();
  }

  async all(): Promise<void> {
    const data = await this.http.all(this.id);
    this.list = data.map((el: any) => {
      el.comprado = el.comprado === 'false' ? false : true;
      return el;
    });

    console.log(this.list);
  }

  async updateIten(obj: ItensCompras): Promise<void> {
    await this.http.marcaItenCompra(obj.id, obj.comprado);
  }
}
