import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {
  Component,
  Input,
  Pipe, PipeTransform,
  QueryList,
  TemplateRef
} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";
import {MdDataCell} from  './data_table_cell';
import {MdDataTableColumn} from './data_table';
import {DataColumnAlign} from './data_table_pipes';

@Component({
  selector: '[md-data-row]',
  directives: [MdCheckbox, MdDataCell],
  pipes: [DataColumnAlign],
  template: `
    <td *ngIf="selectable" class="md-data-check-cell">
      <md-checkbox [(checked)]="data.selected"></md-checkbox>
    </td>
    <td *ngFor="#cell of templs; #i=index"
        [ngClass]="getColumn(i) | dataColumnAlign">
      <template md-data-cell [data]="data" [templ]="cell"></template>
      {{column}}
    </td>
  `
})
export class MdDataRow {
  @Input() data: any;
  @Input() selectable: boolean;
  @Input() templs: QueryList<TemplateRef>;
  @Input() columns: MdDataTableColumn[]

  constructor() {}

  alignRight(index: number) {
    let column = this.columns[index];
    if (column.align && column.align.toUpperCase() === 'RIGHT') {
      return true;
    } else if (column.numeric) {
      return column.numeric;
    }
  }

  alignCenter(index: number) {
    let column = this.columns[index];
    if (column.align && column.align.toUpperCase() === 'CENTER') {
      return true;
    }
  }

  getColumn(i) {
    return this.columns[i];
  }
  
}
