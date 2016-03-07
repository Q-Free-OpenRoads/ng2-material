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

import {MdDataTable} from './data_table';

@Directive({
  selector: '[md-data-cell]'

})
export class MdDataCell {
  // Mostly a handle for passing data down.
  mdDataTable: MdDataTable;

  constructor(private _element: ElementRef
    // @Host() mdDataTable: MdDataTable
    ) {
    // this.mdDataTable = mdDataTable;
  }

  ngAfterViewInit() {
    // console.log('cell table?', this.mdDataTable);
  }
}
