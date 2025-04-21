import { Component, Input, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ges-cars-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent implements OnInit {
  @Input() control: any;
  @Input() label = '';
  @Input() multiple = false;
  @Input() search = false;

  @Input() set options(value: any) {
    this.optionsData = value;
    this.filtredData = value;
     
    if (this.control && this.control.value) {
      const op = this.optionsData.find(
        (item) => item.value === this.control.value
      );
      if(op){
        this.controlSearch.setValue(op.viewValue, { emitEvent: false });
      }
    }
  }
  controlSearch = new FormControl();
  filtredData: any[] = [];
  optionsData: any[] = [];

  ngOnInit(): void {
    if (this.search) {
      this.controlSearch.valueChanges.subscribe((res) => {
        this.control.markAsTouched();
        this.control.setValue(null);
        this.filtredData = this.optionsData.filter((option) =>
          option.viewValue.toLowerCase().includes(res)
        );
      });
      this.control.valueChanges.subscribe((res: any) => {
        const op = this.optionsData.find((item) => item.value === res);
        this.controlSearch.setValue(op.viewValue, { emitEvent: false });
      });
    }
  }

  selectOption(option: any) {
    this.control.setValue(option.value, { emitEvent: false });
    this.controlSearch.setValue(option.viewValue, { emitEvent: false });
  }
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
