import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {
  AfterViewInit,
  Attribute,
  Component,
  ComponentRef,
  ContentChildren,
  Directive,
  DynamicComponentLoader,
  ElementRef,
  Host,
  Input,
  Pipe, PipeTransform,
  Query,
  QueryList,
  Renderer,
  View,
  ViewEncapsulation,
} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";
import {MdDivider} from "../divider/divider";

import {MdDataCell} from './data_table_cell';
export {MdDataCell} from './data_table_cell';
import {MdDataTbody} from './data_table_body';
export {MdDataTbody} from './data_table_body';
import {MdDataThead} from './data_table_head';
export {MdDataThead} from './data_table_head';

export interface MdDataTableColumn {
  title: String;
  numeric?: boolean;
  hidden?: boolean;
}

export interface MdDataTableColumnSortable extends MdDataTableColumn {
  sortable
}

export interface MdDataTableColumns {
  [index: number]: MdDataTableColumn; 
}

@Component({
  selector: 'md-data-row',
  template: `<ng-content></ng-content>`
})
export class MdDataRow {
  @Input() data: any;

  constructor() {

  }

}

/**
 * @description
 * The `md-data-table` class names can be used to style any <table>.
 *
 * @usage
 * <hljs lang="html">
 * <table md-data-table>
 *    <thead md-data-thead>
 *      <tr>
 *        <th>Material</th>
 *        <th class="md-data-column--numeric">Unit price</th>
 *      </tr>
 *    </thead>
 *    <tbody md-data-tbody>
 *      <tr *ngFor="#item of materials; #index = index">
 *        <td>{{ item.type }}</td>
 *        <td class="md-data-column--numeric">{{ item.price }}</td>
 *      </tr>
 *    </tbody>
 *  </table>
 * </hljs>
 *
 * @description
 * Or for more complex use cases, use <md-data-table> component, with
 * column definitions for things like column sorting, showing/hiding, etc.:
 * 
 * 
 */
@Component({
  selector: 'md-data-table',
  host: {
    'role': 'table',
    'class': ''
  },
  // inputs: ['columns'],
  // pipes: [MdDataVisibleColumns],
  directives: [MdCheckbox, MdDataCell, MdDataRow],
  template: `
  <table class="md-data-table">
    <thead md-data-thead>
      <tr>
        <th *ngIf="selectable" class="md-data-check-cell">
          <md-checkbox (click)="headCheckClick"></md-checkbox>
        </th>
        <th *ngFor="#column of columns; #columnIndex = index"
            [class.md-data-column--numeric]="column.numeric"
            (click)="selectedColumn($event, columnIndex)">
          {{column.title}}
        </th>
      </tr>
    </thead>
    <tbody md-data-tbody>
      <tr *ngFor="#item of model; #index = index" [ngForTemplate]='MdDataRow'>
        <td *ngIf="selectable" class="md-data-check-cell">
          <md-checkbox (click)="rowCheckClick"></md-checkbox>
        </td>
        <ng-content></ng-content>
      </tr>
    </tbody>
  </table>`
})
export class MdDataTable {

  @Input() selectable: boolean;
  @Input() columns: MdDataTableColumn[];
  @Input() sortable: boolean;
  @Input() model: any;

  @ContentChildren(MdDataCell) contentChildren: QueryList<MdDataCell>; 

  constructor() {
    
  }

  selectedColumn(event, index) {
    console.log('Column Selected', index, event);
    if (this.sortable) {

    }
  }

  ngAfterViewInit() {
    /*console.log('selectable', this.selectable);
    console.log('columns', this.columns);
    console.log('model?', this.model);*/
  }

  ngAfterContentInit() {
    //content children should be ready.
    console.log("contentChildren", this.contentChildren);
  }

  headCheckClick(e) {

  }

  rowCheckClick(e) {

  }
}
