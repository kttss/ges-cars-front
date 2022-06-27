import { Component, Input } from '@angular/core';

@Component({
  selector: 'ges-cars-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent {
  @Input() options: any[] = [];
  @Input() control: any;
  @Input() label = '';
}
