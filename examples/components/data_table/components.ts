import {View, Component, ElementRef} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MdDataColumnComparator, Sort, MdDialog} from 'ng2-material/all';
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

@Component({selector: 'data-table-components'})
@View({
  templateUrl: 'examples/components/data_table/components.html',
  styleUrls: ['examples/components/data_table/components.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DataTableComponent {

  constructor(public dialog: MdDialog, public element: ElementRef) {

  }

  showAlert(ev) {
    let config = new MdDialogConfig()
      .parent(DOM.query('#popupContainer'))
      .textContent(`
        You can handle row clicks anyway you like,
        but we are just going to toggle row selection for now.
      `)
      .title(`You selected ${ev.type}`)
      .ok('Got it!')
      .targetEvent(ev);
    this.dialog.open(MdDialogBasic, this.element, config);
  };

  typeSort: MdDataColumnComparator = (a, b, direction) => {
    let parenRegex = /.*?\((.*?)\)$/;
    let desc1 = a.type.match(parenRegex)[1];
    let desc2 = b.type.match(parenRegex)[1];

    if (desc1 == desc2) {
      return 0;
    }

    let val = desc2 > desc1 ? 1 : -1;
    // invert for descending sort:
    return direction !== Sort.ASCEND ? val : val * -1;
  };

  columns = [
    {
      title: "Material",
      // For specific sorting, pass a comparator function.
      // for instance, this one sorts by what's in parenthesis.
      comparator: this.typeSort
    },
    {
      title: "Quantity",
      numeric: true, //aligns column right by default. A good convention.
      sortKey: 'qty'
    },
    {
      title: "Unit price",
      align: 'right', //specify alignment.
      sortKey: 'price'
    },
  ];
  
  materials = [
    {
      type: "Acrylic(Transparent)",
      qty: 25,
      price: 2.90
    },
    {
      type: "Plywood(Luan)",
      qty: 50,
      price: 1.25
    },
    {
      type: "Laminate(Gold on Blue)",
      qty: 10,
      price: 2.35
    }
  ];

  rowClick(item) {
    this.showAlert(item);
    item.selected = !item.selected;
  }

}
