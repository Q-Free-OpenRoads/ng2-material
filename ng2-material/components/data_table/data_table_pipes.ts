import {Pipe} from 'angular2/core';
import {MdDataTableColumn, Sort} from './data_table';

@Pipe({
  name: 'dataColumnAlign'
})
export class DataColumnAlign {
  transform(column: MdDataTableColumn, args :any[]): any {
    if (column.align) {
      switch(column.align.toUpperCase()) {
        case 'RIGHT':
          return 'md-data-column--align-right';
        case 'CENTER':
          return 'md-data-column--align-center';
        default:
          return '';
      }
    }

    return column.numeric ? 'md-data-column--align-right' : '';
  }
}

@Pipe({
  name: 'dataColumnSort',
  pure: false //seems to be required to prevent caching, at least in beta.7
})
export class DataColumnSort {
  transform(model: any[], args: any[]): any[] {
    let column: MdDataTableColumn = args[0];

    if (!column) {
      return model;
    }

    if (column.comparator) {
      // how to tell comparator which direction we're going?

    } else if (column.sortKey) {

      return model.sort((a, b) => {
        if (column.sort === Sort.DESCEND) {
          return a[column.sortKey] < b[column.sortKey] ? 1 : -1;
        }
        return a[column.sortKey] > b[column.sortKey] ? 1 : -1;
      });

    }

    return model;
  }
}
