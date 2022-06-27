import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ges-cars-new-agence',
  templateUrl: './new-agence.component.html',
  styleUrls: ['./new-agence.component.scss'],
})
export class NewAgenceComponent {
  agenceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    telephones: new FormControl([], [Validators.required]),
    emails: new FormControl([], [Validators.required]),
    faxs: new FormControl([], [Validators.required]),
  });

  get form() {
    return this.agenceForm.controls;
  }
}
