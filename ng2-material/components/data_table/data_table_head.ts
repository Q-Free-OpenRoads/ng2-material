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

@Directive({
  selector: 'md-data-thead',
  /*host: {
    
  }*/
})
export class MdDataThead implements AfterViewInit {

  @Input() selectable: Boolean;

  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): any {
    this.styleChildren();
    console.log('child.selectable', this.selectable);
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
