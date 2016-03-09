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

@Component({
  selector: '[md-data-row]',
  directives: [MdCheckbox, MdDataCell],
  template: `
    <td *ngIf="selectable" class="md-data-check-cell">
      <md-checkbox (click)="rowCheckClick"></md-checkbox>
    </td>
    <td *ngFor="#cell of templs; #i=index">
      <template md-data-cell [data]="data" [templ]="cell"></template>
    </td>
  `
})
export class MdDataRow {
  @Input() data: any;
  @Input() selectable: boolean;
  @Input() templs: QueryList<TemplateRef>;
  @Input() columns: MdDataTableColumn[]

  constructor() {}
}
