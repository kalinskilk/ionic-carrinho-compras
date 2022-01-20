import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBuyPageRoutingModule } from './new-buy-routing.module';

import { NewBuyPage } from './new-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBuyPageRoutingModule
  ],
  declarations: [NewBuyPage]
})
export class NewBuyPageModule {}
