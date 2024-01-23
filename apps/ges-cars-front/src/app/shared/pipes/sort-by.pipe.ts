import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../components/table/table.component';
import * as moment from 'moment';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], order: IOrder): any {
    if (order.type === 'date') {
      return value.sort((a, b) =>
        moment(
          order.order === 'ASC' ? a[order.column] : b[order.column],
          'DD/MM/YYY'
        ).diff(
          moment(
            order.order === 'ASC' ? b[order.column] : a[order.column],
            'DD/MM/YYY'
          ),
          'days'
        )
      );
    } else {
      return value.sort((a, b) =>
        order.order === 'ASC'
          ? a[order.column].localeCompare(b[order.column])
          : b[order.column].localeCompare(a[order.column])
      );
    }
  }
}
