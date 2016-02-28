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

@Component({
  selector: '[md-data-row]',
  directives: [MdCheckbox],
  inputs: ['data'],
  template: `
    <td *ngIf="selectable" class="md-data-check-cell">
      <md-checkbox (click)="rowCheckClick"></md-checkbox>
    </td>
    <ng-content></ng-content>
  `
})
export class MdDataRow {
  @Input() data: any;
  @Input() selectable: boolean;

  constructor() {
    console.log('hello data row component.');
  }

  ngAfterContentInit() {
    console.log("row data", this.data);
  }

}
