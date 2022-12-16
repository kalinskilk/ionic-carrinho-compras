import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {
  /**
   *
   * @param date data a ser formatada
   * @returns a data formata YYYY-MM-DD HH:MM:SS
   */
  formatDate(date: Date): string {
    return date
      .toLocaleString('en-GB')
      .slice(0, 10)
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-');
  }

  getStartEndWeekendDay(date?: Date): {
    dateInitial: string;
    dateFinal: string;
  } {
    if (!date) {
      date = new Date();
    }
    const indexOfWeek = date.getDay();
    const arrAtSun = Array.from({ length: indexOfWeek || 1 }, (v, k) => k + 1);
    const arrAtSat = Array.from({ length: 6 - indexOfWeek }, (v, k) => k + 1);
    const initialDate = this.getPreviousDay(
      new Date(date),
      arrAtSun[arrAtSun.length - 1]
    );
    const finalDate = this.getNextDay(
      new Date(date),
      arrAtSat[arrAtSat.length - 1]
    );
    return {
      dateInitial: this.formatDate(initialDate),
      dateFinal: this.formatDate(finalDate),
    };
  }

  /**
   * GET PREVIOUS DAY OF DATE.
   *
   * @param date any date
   * @param dayPrevious quantify of date before
   * @returns date previous of date
   * @example this.getPreviousDay(new Date(2022,11,1),1)
   * expected output: {weekDay:'Wed',day:30,index:3}
   */
  private getPreviousDay(date: Date, dayPrevious: number): Date {
    return new Date(date.setDate(date.getDate() - dayPrevious));
  }

  /**
   * GET NEXT DAY OF DATE.
   *
   * @param date any date
   * @param dayPrevious quantify of date after
   * @returns date previous of date
   * @example this.getPreviousDay(new Date(2022,11,1),1)
   * expected output: {weekDay:'Wed',day:30,index:3}
   */
  private getNextDay(date: Date, dayPrevious: number): Date {
    return new Date(date.setDate(date.getDate() + dayPrevious));
  }
}
