import {
  Component,
  ContentChildren,
  Host,
  Input,
  Pipe, PipeTransform,
  Query,
  QueryList,
  Renderer,
  TemplateRef,
  View,
  ViewContainerRef,
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
import {MdDataRow} from './data_table_row';
export {MdDataRow} from './data_table_row';

import {DataColumnAlign, DataColumnSort} from './data_table_pipes';

export const COLUMN_ALIGN = {
  RIGHT: 'right',
  LEFT: 'left',
  CENTER: 'center'
};

export enum Sort {
  ASCEND, DESCEND
}

export interface MdDataTableColumn {
  /** Text to display in column heading. */
  title: String;

  /** will trigger right text alignment. */
  numeric?: boolean;

  /** whether a column is hidden. */
  hidden?: boolean;

  /** efault left. "RIGHT" or "CENTER" to override */
  align?: string;

  /** model[property] to sort by. Column is sortable if this is present. */
  sortKey?: string;

  /**
   * Comparator for sorting the model for this column.
   * Column is sortable if this is present. {@link sortKey} is ignored if this is present.
   */
  comparator?: Function;

  /** ASCEND or DESCEND */
  sort?: Sort;
}

export interface MdDataTableColumnSortable extends MdDataTableColumn {
  sortable
}

export interface MdDataTableColumns {
  [index: number]: MdDataTableColumn; 
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
  pipes: [DataColumnAlign, DataColumnSort],
  directives: [MdCheckbox, MdDataCell, MdDataRow, MdDataTbody],
  template: `
  <table class="md-data-table">
    <thead md-data-thead>
      <tr>
        <th *ngIf="selectable" class="md-data-check-cell">
          <md-checkbox [checked]="allSelected" (click)="toggleAllSelection()"></md-checkbox>
        </th>
        <th *ngFor="#column of columns; #columnIndex = index"
            [ngClass]="column | dataColumnAlign"
            [class.sortable]="column.sortKey"
            [class.md-data-table__header--sorted-ascending]="column.sort == sort.ASCEND"
            [class.md-data-table__header--sorted-descending]="column.sort == sort.DESCEND"
            (click)="sortColumn(column)">
          {{column.title}}
        </th>
      </tr>
    </thead>
    <tbody md-data-tbody [model]="model" [columns]="columns">
      <tr md-data-row *ngFor="#item of model | dataColumnSort:sortingColumn" [cells]="dataCells"
          [selectable]="selectable"
          [columns]=columns
          [data]="item"
          [class.is-selected]="item.selected"
          [templs]=cellTemplates></tr>
    </tbody>
  </table>`
})
export class MdDataTable {

  @Input() selectable: boolean;
  @Input() columns: MdDataTableColumn[];
  @Input() sortable: boolean;
  @Input() model: any;

  //TODO (Samjones) need support for NgFor trackBy

  allSelected: boolean;
  sortingColumn: MdDataTableColumn;
  static ASCENDING: string = 'ASCENDING';
  static DESCENDING: string = 'DESCENDING';
  sort: typeof Sort = Sort; // define enum as a class field for template ref.

  @ContentChildren(TemplateRef) cellTemplates: QueryList<MdDataCell>;

  constructor(private _viewContainer: ViewContainerRef) {
  }

  sortColumn(column) {
    if (!column.sortKey) {
      // don't sort by anything, because we don't know how to sort this one
      return;
    }
    if (this.sortingColumn === column) {
      // invert to ascending/descending
      column.sort = column.sort === Sort.DESCEND ? Sort.ASCEND : Sort.DESCEND;
    } else {
      for (var i in this.columns) {
        delete this.columns[i].sort;
      }
      // sort this one ascending:
      this.sortingColumn = column;
      column.sort = Sort.ASCEND;
    }
  }

  toggleAllSelection() {
    // (Samjones) - Is this too simplistic? When the time for filtering rows comes
    // this will select even hidden rows. Probably best to assume row-hiding is done
    // as parent component mutates the model.
    this.allSelected = !this.allSelected;
    for (var i in this.model) {
      this.model[i].selected = this.allSelected;
    }
  }

}
