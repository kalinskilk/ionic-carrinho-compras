import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBuyPageRoutingModule } from './new-buy-routing.module';

import { NewBuyPage } from './new-buy.page';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBuyPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewBuyPage, ListComponent],
})
export class NewBuyPageModule {}
