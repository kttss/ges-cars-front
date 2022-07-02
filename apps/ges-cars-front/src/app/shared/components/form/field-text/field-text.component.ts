import { Component, Input } from '@angular/core';

@Component({
  selector: 'ges-cars-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.scss'],
})
export class FieldTextComponent {
  @Input() label = '';
  @Input() control: any;
  @Input() type = 'text';

  getMessage() {
    if (this.control.hasError('required')) {
      return 'champs est obligatoire';
    } else if (this.control.hasError('passwordsNotMatching')) {
      return 'Ces mots de passe ne correspondent pas. Veuillez réessayer.';
    } else if (this.control.hasError('email')) {
      return 'email invalide';
    } else if (this.control.hasError('phone')) {
      return 'phone invalide';
    } else if (this.control.hasError('fax')) {
      return 'phone fax';
    } else {
      return 'champs est obligatoire';
    }
  }
}
