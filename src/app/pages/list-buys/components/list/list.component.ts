import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Compras } from 'src/app/services/sql/tables-consts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() list: Compras[] = [];
  @Output() sendIdCompra: EventEmitter<{ id: number; descBuy: string }> =
    new EventEmitter<{ id: number; descBuy: string }>();
  @Output() deleteCompra: EventEmitter<number> = new EventEmitter<number>();

  onSelectCompra(id: number, descBuy: string): void {
    this.sendIdCompra.emit({ id, descBuy });
  }

  onDelete(id: number): void {
    this.deleteCompra.emit(id);
  }
}
