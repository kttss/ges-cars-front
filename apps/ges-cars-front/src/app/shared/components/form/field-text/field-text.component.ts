import { Component, Input } from '@angular/core';

@Component({
  selector: 'ges-cars-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.scss'],
})
export class FieldTextComponent {
  @Input() label = '';
  @Input() control: any;

  getMessage() {
    if (this.control.hasError('required')) {
      return 'champs est obligatoire';
    } else {
      return 'champs est obligatoire';
    }
  }
}
