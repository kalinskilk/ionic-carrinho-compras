import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { listOptions } from './consts';

@Component({
  selector: 'app-list-options-buys',
  templateUrl: './list-options-buys.component.html',
  styleUrls: ['./list-options-buys.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOptionsBuysComponent {
  public listOptions = listOptions;

  constructor(public router: Router) {}

  navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
