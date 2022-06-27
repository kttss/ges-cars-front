/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ges-cars-tag-field',
  templateUrl: './tag-field.component.html',
  styleUrls: ['./tag-field.component.scss'],
})
export class TagFieldComponent implements OnInit {
  @Input() label = '';
  @Input() control: any;
  @Input() placeholder = '';
  @Input() secondaryPlaceholder = '';
  data: any = [];

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.subscribe((res: string[]) => {
        this.data = res;
      });
    }
  }

  onAddTag(event: any) {
    const { value } = this.control;
    value.push(event.value);
    this.control.setValue([...value]);
  }

  onRemoveTag(event: any) {
    const { value } = this.control;
    this.control.setValue([
      ...value.filter((v: string) => v !== event, event.value),
    ]);
  }
}
