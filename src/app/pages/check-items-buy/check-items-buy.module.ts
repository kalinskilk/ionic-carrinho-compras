import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckItemsBuyPageRoutingModule } from './check-items-buy-routing.module';

import { CheckItemsBuyPage } from './check-items-buy.page';
import { CheckItemsBuyService } from './check-items-buy.service';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckItemsBuyPageRoutingModule,
  ],
  declarations: [CheckItemsBuyPage, ModalComponent],
  providers: [CheckItemsBuyService],
})
export class CheckItemsBuyPageModule {}
