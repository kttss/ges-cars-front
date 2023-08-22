import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { SortByPipe } from './pipes/sort-by.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
    SortByPipe,
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
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
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
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class SharedModule {}
