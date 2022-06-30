import { Component, OnInit } from '@angular/core';

import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'ges-cars-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.scss'],
})
export class ImageFieldComponent implements OnInit {
  file = '';
  avatar =
    'https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/placeholder.jpg';
  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  onchange(event: any) {
    const formData: any = new FormData();
    formData.append('file', event.target.files[0]);

    this.fileService
      .upload(formData)

      .subscribe((filename: any) => {
        this.file = this.fileService.getUrl(filename);
      });
  }

  onDelete() {
    this.file = '';
  }
}
