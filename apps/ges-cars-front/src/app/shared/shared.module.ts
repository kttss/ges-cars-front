import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TableComponent } from './components/table/table.component';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { FieldTextComponent } from './components/form/field-text/field-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { TagFieldComponent } from './components/form/tag-field/tag-field.component';
import { ImageFieldComponent } from './components/form/image-field/image-field.component';
import { SelectFieldComponent } from './components/form/select-field/select-field.component';
import { ImageComponent } from './components/image/image.component';
import { DatepickerFieldComponent } from './components/form/datepicker-field/datepicker-field.component';
import { AccessControlDirective } from './directive/access-control.directive';

@NgModule({
  declarations: [
    TableComponent,
    ContainerComponent,
    CardComponent,
    FieldTextComponent,
    TagFieldComponent,
    ImageFieldComponent,
    SelectFieldComponent,
    ImageComponent,
    DatepickerFieldComponent,
    AccessControlDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  exports: [
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TableComponent,
    ContainerComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    FieldTextComponent,
    TagInputModule,
    TagFieldComponent,
    ImageFieldComponent,
    SelectFieldComponent,
    ImageComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    DatepickerFieldComponent,
    AccessControlDirective,
  ],
})
export class SharedModule {}
