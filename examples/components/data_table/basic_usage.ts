import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';


@Component({selector: 'data-table-basic-usage'})
@View({
  templateUrl: 'examples/components/data_table/basic_usage.html',
  styleUrls: ['examples/components/data_table/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DataTableBasicUsage {
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
