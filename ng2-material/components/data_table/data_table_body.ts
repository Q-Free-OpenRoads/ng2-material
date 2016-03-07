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

import {MdDataTableColumn} from './data_table';
import {MdDataRow} from './data_table_row';

@Directive({
  selector: '[md-data-tbody]',
  /*  host: {
    ''
    },*/
  // directives: [MdDataRow],
  /*template: `
  <!-- <template ngFor #item [ngForOf]="model" #rowIndex="index"> -->
    <tr *ngFor="#item of model">
      <td>.</td><td>.</td><td>.</td>
    </tr>
  <!-- </template> -->
  `*/
})
export class MdDataTbody implements AfterViewInit {
  
  @Input() selectable: boolean;
  @Input() columns: MdDataTableColumn[];
  @Input() model: any;

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
