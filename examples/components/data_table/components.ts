import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';


@Component({selector: 'data-table-components'})
@View({
  templateUrl: 'examples/components/data_table/components.html',
  styleUrls: ['examples/components/data_table/components.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DataTableComponent {
  columns = [
    {
      title: "Material",
    },
    {
      title: "Quantity",
      numeric: true, //aligns column right by default. A good convention.
      sortKey: 'qty'
    },
    {
      title: "Unit price",
      align: 'right', //specify alignment if you need something specific.
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
      type: "Plywood(Birch)",
      qty: 50,
      price: 1.25
    },
    {
      type: "Laminate(Gold on Blue)",
      qty: 10,
      price: 2.35
    }
  ];
}
