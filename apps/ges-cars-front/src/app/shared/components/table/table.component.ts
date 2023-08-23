import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../services/search.service';

import { IDataSource } from '../../models/table.model';
import { SortByPipe } from '../../pipes/sort-by.pipe';

export interface IOrder {
  column: string;
  order: 'ASC' | 'DESC';
  type: 'string' | 'date';
}

export interface IPaginate {
  page: number;
  count: number;
  orderBy: string;
  order: 'ASC' | 'DESC';
  search: string;
  total: number;
}

@Component({
  selector: 'ges-cars-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SortByPipe],
})
export class TableComponent implements OnInit {
  @Output() onedit = new EventEmitter();
  @Output() onpaginate = new EventEmitter();
  @Output() ondelete = new EventEmitter();
  @Output() viewDetail = new EventEmitter();
  @Output() oncreate = new EventEmitter();
  @Input() dataSource: IDataSource | undefined;

  @Input() paginate: IPaginate | null = null;

  order: IOrder = {
    column: 'creatAt',
    type: 'date',
    order: 'DESC',
  };

  search = '';

  get data() {
    if (this.paginate) {
      return this.dataSource?.rows;
    } else {
      return this.sortPipe.transform(this.transformedData, this.order);
    }
  }

  get transformedData(): any {
    return this.dataSource?.rows.filter((e) => {
      return (
        Object.keys(e).some((r: string) =>
          String(e[r]).includes(this.search)
        ) || this.search === ''
      );
    });
  }

  constructor(
    private searchService: SearchService,
    private sortPipe: SortByPipe
  ) {}

  ngOnInit(): void {
    this.searchService.onsearch.subscribe((text: any) => {
      if (/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(text)) {
        this.search = text;
        const [day, month, year] = text.split('/');
        this.search = `${year}-${month}-${day}`;
      } else {
        this.search = text;
      }

      if (this.paginate) {
        this.onpaginate.emit({
          ...this.paginate,
          page: 0,
          search: this.search,
        });
      }
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

  sort(column: string, type: any): void {
    this.order.column = column;
    this.order.type = type && type === 'date' ? 'date' : 'string';
    if (this.order.column === column) {
      this.order.order = this.order.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.order.column = column;
      this.order.order = 'ASC';
    }
  }

  sortByAPI(col: any) {
    this.order.column = col.key;
    if (this.order.column === col.key) {
      this.order.order = this.order.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.order.column = col.key;
      this.order.order = 'ASC';
    }
    this.onpaginate.emit({
      ...this.paginate,
      orderBy: col.orderKey,
      order: this.order.order,
    });
  }

  changePaginate(event: any) {
    this.onpaginate.emit({
      ...this.paginate,
      page: event.pageIndex,
      count: event.pageSize,
    });
  }
}
