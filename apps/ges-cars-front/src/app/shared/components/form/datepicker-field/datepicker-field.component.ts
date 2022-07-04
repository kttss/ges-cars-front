import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ges-cars-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.scss'],
})
export class DatepickerFieldComponent {
  @Input() label = '';
  @Input() control: any;

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
