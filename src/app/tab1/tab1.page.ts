import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateUtilsService } from '../services/date-utils.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public labelsSpending: string[] = [];
  public reportDataSpending: number[] = [];
  public labelsItensBuyeds: string[] = [];
  public reportDataItensBuyeds: number[] = [];

  constructor(
    private router: Router,
    private reportService: ReportService,
    private dateUtilsService: DateUtilsService
  ) {}

  ionViewDidEnter(): void {
    this.getStartEndWeekendDay();
    this.reportWeekItensBuyeds();
  }

  async getStartEndWeekendDay(): Promise<void> {
    const { dateInitial, dateFinal } =
      this.dateUtilsService.getStartEndWeekendDay(new Date());
    const data = await this.reportService.reportWeekSpending(
      dateInitial,
      dateFinal
    );
    this.labelsSpending = data.map((el) => el.label);
    this.reportDataSpending = data.map((el) => el.value);
  }

  async reportWeekItensBuyeds(): Promise<void> {
    const { dateInitial, dateFinal } =
      this.dateUtilsService.getStartEndWeekendDay(new Date());
    const data = await this.reportService.reportWeekItensBuyeds(
      dateInitial,
      dateFinal
    );
    this.labelsItensBuyeds = data.map((el) => el.label);
    this.reportDataItensBuyeds = data.map((el) => el.value);
  }

  newBuy(): void {
    console.log('new byu');
    this.router.navigate(['/tabs/new-buy/0/ ']);
  }
}
