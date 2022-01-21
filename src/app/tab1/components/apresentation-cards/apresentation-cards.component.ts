import { Component } from '@angular/core';
import { listCards } from './apresentation-cards-consts';

@Component({
  selector: 'app-apresentation-cards',
  templateUrl: './apresentation-cards.component.html',
  styleUrls: ['./apresentation-cards.component.scss'],
})
export class ApresentationCardsComponent {
  public list = listCards;
}
