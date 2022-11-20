import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ges-cars-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.scss'],
})
export class DatepickerFieldComponent implements OnInit {
  @Input() label = '';
  @Input() control: any;
  @Input() type: 'date' | 'datetime' = 'date';

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

  ngOnInit(): void {
    this.control.valueChanges.subscribe((d: any) => {
      this.control.setValue(moment(d).set('second', 0).toDate(), {
        emitEvent: false,
      });
    });
  }
}
