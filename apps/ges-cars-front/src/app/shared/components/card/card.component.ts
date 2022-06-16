import { Component, Input } from '@angular/core';

@Component({
  selector: 'ges-cars-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title = '';
  @Input() icon = '';
}
