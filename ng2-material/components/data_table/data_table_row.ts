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
  TemplateRef,
  View,
  ViewContainerRef,
  ViewEncapsulation,
} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";
// import {MdDataCell} from  './data_table_cell';

@Directive({
  selector: '[md-data-cell]',
  /*template: `
    
  `*/
})
export class MdDataCell {
  @Input() data: any;
  @Input() templ: TemplateRef;

  constructor(private _viewContainer: ViewContainerRef) {}

  ngAfterContentInit() {
    this._viewContainer.createEmbeddedView(this.templ, 0);
  }
}

@Component({
  selector: '[md-data-row]',
  directives: [MdCheckbox, MdDataCell],
  inputs: ['data'],
  template: `
    <td *ngIf="selectable" class="md-data-check-cell">
      <md-checkbox (click)="rowCheckClick"></md-checkbox>
    </td>
<!--     <template ngFor #cell [ngForOf]="cells" [ngForTemplate]="cell">
    <td><cell></cell></td>
  </template>
   -->
   <template ngFor #cell [ngForOf]="templ" [ngForTemplate]="cell">
     <td md-data-cell [data]="data" [templ]="cell"></td>
   </template>
  `
})
export class MdDataRow {
  @Input() data: any;
  @Input() selectable: boolean;
  @Input() cells: QueryList<MdDataCell>;
  @Input() templ: QueryList<TemplateRef>;

  constructor(private _viewContainer: ViewContainerRef,
      private _elementRef: ElementRef) {
    // console.log('hello data row component.');
  }

  ngAfterContentInit() {
    console.log("row data", this.data);
    console.log("view container", this._viewContainer);
    console.log("elementRef", this._elementRef);
    // console.log("cells", this.cells);
    console.log("templ", this.templ);
    // this._viewContainer.insert(this.cells);
    // this.cells.map(cell => {
    //   this._viewContainer.insert(cell);
    // });
    // this._viewContainer.createEmbeddedView(this.templ, 0);
    // this._elementRef.element.nativeElement.appendChild
  }

  //from ngFor:
  /*private _bulkInsert(tuples: RecordViewTuple[]): RecordViewTuple[] {
    tuples.sort((a, b) => a.record.currentIndex - b.record.currentIndex);
    for (var i = 0; i < tuples.length; i++) {
      var tuple = tuples[i];
      if (isPresent(tuple.view)) {
        this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
      } else {
        tuple.view =
          this._viewContainer.createEmbeddedView(this._templateRef, tuple.record.currentIndex);
      }
    }
    return tuples;
  }*/
}
