import {
  MdDataTableColumn,
  MdDataColumnComparator,
  Sort
} from "../../../ng2-material/components/data_table/data_table";

var testComparator: MdDataColumnComparator;
testComparator = function(a, b, direction: Sort): number {
  return 1;
};

export var testColumns: MdDataTableColumn[] = [
  {
    title: 'uno',
    sortKey: 'name'
  },
  {
    title: 'dos',
    numeric: true,
    sortKey: 'callSign'
  },
  {
    title: 'tres',
    align: 'middle',
    sortKey: 'value'
  },
  {
    title: 'quatro',
    comparator: testComparator
  }
];

export var testModel: any[] = [
  {
    name: 'ALPHA',
    callSign: "rose",
    value: 33,
    date: 1457818195960
  },
  {
    name: 'BETA',
    callSign: "thimble",
    value: 1,
    date: 1457818200035
  },
  {
    name: 'GAMMA',
    callSign: "tribbles",
    value: 55,
    date: 1457818201961
  },
  {
    name: 'DELTA',
    callSign: "frontierism",
    value: 22,
    date: 1457818203048
  }
];



