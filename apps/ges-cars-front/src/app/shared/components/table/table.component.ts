import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../services/search.service';

import { IDataSource } from '../../models/table.model';

@Component({
  selector: 'ges-cars-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() onedit = new EventEmitter();
  @Output() ondelete = new EventEmitter();
  @Output() viewDetail = new EventEmitter();
  @Output() oncreate = new EventEmitter();
  @Input() dataSource: IDataSource | undefined;

  search = '';

  get data() {
    return this.dataSource?.rows.filter((e) => {
      return (
        Object.keys(e).some((r: string) =>
          String(e[r]).includes(this.search)
        ) || this.search === ''
      );
    });
  }

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.onsearch.subscribe((text: any) => {
      console.log(text);
      this.search = text;
    });
  }

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCreate(row: any) {
    this.oncreate.emit(row);
  }
}
