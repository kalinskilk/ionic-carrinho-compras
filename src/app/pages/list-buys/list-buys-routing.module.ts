import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBuysPage } from './list-buys.page';

const routes: Routes = [
  {
    path: '',
    component: ListBuysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBuysPageRoutingModule {}
