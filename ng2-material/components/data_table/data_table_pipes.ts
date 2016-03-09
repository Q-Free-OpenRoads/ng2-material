import {Pipe} from 'angular2/core';
import {MdDataTableColumn} from './data_table';

@Pipe({
  name: 'dataColumnAlign'
})
export class DataColumnAlign {
  transform(column: MdDataTableColumn, args:any[]): any {
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
