import { Component, Input } from '@angular/core';

import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'ges-cars-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.scss'],
})
export class ImageFieldComponent {
  @Input() control: any;

  file = '';
  avatar =
    'https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/placeholder.jpg';
  constructor(private fileService: FileService) {}

  get isMultiple() {
    return this.control && typeof this.control.value !== 'string';
  }

  get files() {
    return this.control.value;
  }

  onchange(img: string) {
    this.control.setValue(img);
  }

  onDelete() {
    this.file = '';
  }

  addImage(img: string) {
    this.control.setValue([...this.control.value, img]);
  }

  editImageByIndex(file: string, index: number) {
    const data = this.files;
    data[index] = file;
    this.control.setValue(data);
  }

  onRemove(index: number) {
    const data = this.files.filter((r: any, i: number) => i !== index);
    this.control.setValue(data);
  }
}
