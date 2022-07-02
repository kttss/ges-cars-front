import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FileService } from '../../../services/file.service';

@Component({
  selector: 'ges-cars-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() avatar = '';
  @Input() file = '';
  @Input() showRemove = false;
  @Input() viewMode = false;
  @Output() changeImg = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor(private fileService: FileService) {}

  onDelete() {
    this.changeImg.emit('');
  }

  change(event: any) {
    this.uploadImage(event.target.files[0]);
  }

  async uploadImage(file: any) {
    const formData: any = new FormData();
    formData.append('file', file);
    const filename = await this.fileService.upload(formData);
    this.changeImg.emit(this.fileService.getUrl(String(filename)));
  }

  onRemove() {
    this.remove.emit();
  }
}
