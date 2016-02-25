import {Directive} from "angular2/core";
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {ElementRef} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {QueryList} from "angular2/core";
import {Query} from "angular2/core";
import {Component} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {Renderer} from "angular2/core";
import {View} from "angular2/core";
import {Attribute} from "angular2/core";
import {DynamicComponentLoader, ComponentRef} from "angular2/core";
import {Input} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";
import {MdDivider} from "../divider/divider";


/**
 * @description
 * The `md-data-table` directive is a decorative container for a <table>.
 *
 * @usage
 * <hljs lang="html">
 * <table md-data-table>
 *    <thead md-data-thead>
 *      <tr>
 *        <th class="md-data-table__cell--non-numeric">Material</th>
 *        <th>Quantity</th>
 *        <th>Unit price</th>
 *      </tr>
 *    </thead>
 *    <tbody md-data-tbody>
 *      <tr *ngFor="#item of materials; #index = index">
 *        <td class="md-data-table__cell--non-numeric">
 *          {{ item.type }}
 *        </td>
 *        <td>{{ item.qty }}</td>
 *        <td>{{ item.price }}</td>
 *      </tr>
 *    </tbody>
 *  </table>
 * </hljs>
 */
@Directive({
  selector: 'md-data-table',
  host: {
    'role': 'table',
    'class': 'md-card md-data-table-container'
  }
})
export class MdDataTable {
  // @Input('selectable') selectable: Boolean;

  //add 'card'ness to its host via host attribute?
}

@Directive({
  selector: 'md-data-thead',
  host: {

  }
})
export class MdDataThead implements AfterViewInit {
  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): any {
    this.styleChildren();
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
