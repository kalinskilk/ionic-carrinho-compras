import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChartComponent],
  exports: [ChartComponent],
})
export default class ChartModule {}
