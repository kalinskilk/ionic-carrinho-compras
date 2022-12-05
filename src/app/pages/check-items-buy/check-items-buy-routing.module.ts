import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckItemsBuyPage } from './check-items-buy.page';

const routes: Routes = [
  {
    path: '',
    component: CheckItemsBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckItemsBuyPageRoutingModule {}
