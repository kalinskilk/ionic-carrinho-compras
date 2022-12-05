import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckItemsBuyPageRoutingModule } from './check-items-buy-routing.module';

import { CheckItemsBuyPage } from './check-items-buy.page';
import { CheckItemsBuyService } from './check-items-buy.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckItemsBuyPageRoutingModule,
  ],
  declarations: [CheckItemsBuyPage],
  providers: [CheckItemsBuyService],
})
export class CheckItemsBuyPageModule {}
