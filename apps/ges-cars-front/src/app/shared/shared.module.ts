import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableComponent } from './components/table/table.component';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { FieldTextComponent } from './components/form/field-text/field-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { TagFieldComponent } from './components/form/tag-field/tag-field.component';

@NgModule({
  declarations: [
    TableComponent,
    ContainerComponent,
    CardComponent,
    FieldTextComponent,
    TagFieldComponent,
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
  ],
})
export class SharedModule {}
