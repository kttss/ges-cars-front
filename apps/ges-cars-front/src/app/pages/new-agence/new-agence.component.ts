import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgenceService } from '../../services/agence.service';

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
    logo: new FormControl('logo'),
  });

  get form() {
    return this.agenceForm.controls;
  }

  constructor(private agenceService: AgenceService) {}

  onSubmit() {
    if (this.agenceForm.invalid) {
      this.agenceForm.markAllAsTouched();
      this.agenceForm.markAsDirty();
    } else {
      this.agenceService
        .create({ ...this.agenceForm.value })
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
