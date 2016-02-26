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
      title: "Material"
    },
    {
      title: "Quantity"
    },
    {
      title: "Unit price"
    },
  ];
  
  materials = [
    {
      type: "Acrylic(Transparent)",
      qty: 25,
      price: "$2.90"
    },
    {
      type: "Plywood(Birch)",
      qty: 50,
      price: "$1.25"
    },
    {
      type: "Laminate(Gold on Blue)",
      qty: 10,
      price: "$2.35"
    }
  ];
}
