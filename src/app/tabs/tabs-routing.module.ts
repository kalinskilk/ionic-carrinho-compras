import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'new-buy/:id/:descBuy',
        loadChildren: () =>
          import('../pages/new-buy/new-buy.module').then(
            (m) => m.NewBuyPageModule
          ),
      },
      {
        path: 'list-buys/:mode',
        loadChildren: () =>
          import('../pages/list-buys/list-buys.module').then(
            (m) => m.ListBuysPageModule
          ),
      },
      {
        path: 'check-items-buy/:id',
        loadChildren: () =>
          import('../pages/check-items-buy/check-items-buy.module').then(
            (m) => m.CheckItemsBuyPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
