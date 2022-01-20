import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBuyPage } from './new-buy.page';

const routes: Routes = [
  {
    path: '',
    component: NewBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBuyPageRoutingModule {}
