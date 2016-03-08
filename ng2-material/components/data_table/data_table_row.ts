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
  EmbeddedViewRef,
  Host,
  Input,
  Pipe, PipeTransform,
  Query,
  QueryList,
  Renderer,
  TemplateRef,
  View,
  ViewRef,
  ViewContainerRef,
  ViewEncapsulation,
} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";
// import {MdDataCell} from  './data_table_cell';

@Directive({
  selector: '[md-data-cell]'
})
export class MdDataCell {
  @Input() data: any;
  @Input() templ: TemplateRef;

  childView: EmbeddedViewRef;

  constructor(private _viewContainer: ViewContainerRef,
    private _elementRef: ElementRef) { }

  ngAfterContentInit() {
    console.log('cell.data', this.data);
    this.childView = this._viewContainer.createEmbeddedView(this.templ);
    // console.log('this.childView', this.childView);
    this.childView.setLocal('data', this.data);
  }
}

@Component({
  selector: '[md-data-row]',
  directives: [MdCheckbox, MdDataCell],
  template: `
    <td *ngIf="selectable" class="md-data-check-cell">
      <md-checkbox (click)="rowCheckClick"></md-checkbox>
    </td>
    <td *ngFor="#cell of templ">
      <template md-data-cell [data]="data" [templ]="cell"></template>
    </td>
  `
})
export class MdDataRow {
  @Input() data: any;
  @Input() selectable: boolean;
  @Input() templ: QueryList<TemplateRef>;

  constructor(private _viewContainer: ViewContainerRef,
      private _elementRef: ElementRef) {
  }
}
