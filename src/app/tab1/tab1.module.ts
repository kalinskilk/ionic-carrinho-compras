import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ApresentationCardsComponent } from './components/apresentation-cards/apresentation-cards.component';
import ChartModule from '../components/chart/chart.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ChartModule,
  ],
  declarations: [Tab1Page, ApresentationCardsComponent],
})
export class Tab1PageModule {}
