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
      return model.sort((a, b) => {
        //call the comparator with the sort direction:
        return column.comparator(a, b, column.sort);
      }); 

    } else if (column.sortKey) {
      //basic sort:
      return model.sort((a, b) => {
        let val = a[column.sortKey] > b[column.sortKey] ? 1 :
                  a[column.sortKey] == b[column.sortKey] ? 0 : -1;
        return column.sort === Sort.DESCEND ? val * -1 : val;
      });

    }

    return model;
  }
}
