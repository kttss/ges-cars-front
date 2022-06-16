import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IDataSource } from '../../models/table.model';

@Component({
  selector: 'ges-cars-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Output() onedit = new EventEmitter();
  @Output() ondelete = new EventEmitter();
  @Output() viewDetail = new EventEmitter();
  @Input() dataSource: IDataSource | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleEdit(row: any) {
    this.onedit.emit(row);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDelete(row: any) {
    this.ondelete.emit(row);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleViewDetail(row: any) {
    this.viewDetail.emit(row);
  }
}
