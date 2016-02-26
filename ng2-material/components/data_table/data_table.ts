import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {
  AfterViewInit,
  Attribute,
  Component,
  ComponentRef,
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
  directives: [MdCheckbox],
  template: `
  <table class="md-data-table">
    <thead md-data-thead>
      <tr>
        <th *ngIf="selectable" class="md-data-check-cell">
          <md-checkbox (click)="headCheckClick"></md-checkbox>
        </th>
        <th *ngFor="#column of columns"
            [class.md-data-column--numeric]="column.numeric"
            (click)="selectedColumn($event)">
          {{column.title}}
        </th>
      </tr>
    </thead>
    <tbody md-data-tbody>
      <tr *ngFor="#item of model; #index = index">
        <td *ngIf="selectable" class="md-data-check-cell">
          <md-checkbox (click)="rowCheckClick"></md-checkbox>
        </td>
        <td>{{item.type}}</td>
        <ng-content [item]="item"></ng-content>
      </tr>
    </tbody>
  </table>`
})
export class MdDataTable {

  @Input() selectable: boolean;
  @Input() columns: MdDataTableColumn[];
  @Input() sortable: boolean;
  @Input() model: any;

  constructor() {
    
  }

  selectedColumn(e) {
    console.log('Column Selected', e);
    if (this.sortable) {

    }
  }

  ngAfterViewInit() {
    /*console.log('selectable', this.selectable);
    console.log('columns', this.columns);
    console.log('model?', this.model);*/
  }

  headCheckClick(e) {

  }

  rowCheckClick(e) {

  }
}

@Directive({
  selector: 'md-data-thead',
  /*host: {

  }*/
})
export class MdDataThead implements AfterViewInit {
  
  @Input() selectable: Boolean;

  mdDataTable: MdDataTable;

  constructor(private _element: ElementRef,
    @Host() mdDataTable: MdDataTable) {
    this.mdDataTable = mdDataTable;

    console.log('child.selectable', this.selectable);
  }

  ngAfterViewInit(): any {
    this.styleChildren();
    console.log('table?', this.mdDataTable);
  }

  styleChildren() {
    let el = this._element.nativeElement;
    var rows = DOM.querySelectorAll(el, 'tr');
    var cells = DOM.querySelectorAll(el, 'td');

    if (rows) {
      // apply row styles, etc.
      for (let i = 0; i < rows.length; i++) {

      }

      if (cells) {
        //apply cell styles, etc.
        for (let i = 0; i < cells.length; i++) {

        }
      }
    }
  }
}

@Directive({
  selector: 'md-data-tbody',
  host: {

  }
})
export class MdDataTbody implements AfterViewInit {
  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): any {
    this.styleChildren();
  }

  styleChildren() {
    //TODO DRY this up with thead style application?
    let el = this._element.nativeElement;
    var rows = DOM.querySelectorAll(el, 'tr');
    var cells = DOM.querySelectorAll(el, 'td');

    if (rows) {
      // apply row styles, etc.
      for (let i = 0; i < rows.length; i++) {

      }

      if (cells) {
        //apply cell styles, etc.
        for (let i = 0; i < cells.length; i++) {

        }
      }
    }
  }
}

@Component({
  selector: 'md-data-checkbox',
  host: {

  },
  template: `
    <MdCheckbox></MdCheckbox>`,
  properties: ['wrap'],
  directives: [MdCheckbox]
})
export class MdDataCheckbox {
  // wait and see if we _need_ this.
  // I don't think we will.
}

@Pipe({ name: 'mdDataVisibleColumns' })
export class MdDataVisibleColumns implements PipeTransform {
  transform(columns: MdDataTableColumn[]) {
    return columns.filter(column => !column.hidden);
  }
}
