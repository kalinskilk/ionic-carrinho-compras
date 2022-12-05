import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBuysPageRoutingModule } from './list-buys-routing.module';

import { ListBuysPage } from './list-buys.page';
import { ListComponent } from './components/list/list.component';
import { ListBuysService } from './list-buys.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListBuysPageRoutingModule],
  declarations: [ListBuysPage, ListComponent],
  providers: [ListBuysService],
})
export class ListBuysPageModule {}
