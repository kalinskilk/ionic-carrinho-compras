import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewBuyModel } from '../../new-buy-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listProdutos: NewBuyModel[] = [];
  @Output() outEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() outDel: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  edit(index: number): void {
    this.outEdit.emit(index);
  }

  delete(index: number): void {
    this.outDel.emit(index);
  }
}
