import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  injectAsync,
  ComponentFixture
} from "angular2/testing";
import {
  Component, View, DebugElement, ViewChildren, QueryList 
} from "angular2/core";
import {By} from "angular2/platform/browser";
import {
  MdDataTable,
  MdDataRow,
  MdDataTbody,
  MdDataCell,
  MdDataColumnComparator,
  MdDataTableColumn,
  MdDataRowClickStyler
} from "../../../ng2-material/components/data_table/data_table";
import {promiseWait} from "../../util";

import {testColumns, testModel} from "./test_data";

export function main() {

  interface ITestFixture {
    fixture:ComponentFixture;
    component:MdDataTable;
    debug:DebugElement;
  }

  @Component({
    selector: 'test-app',
    directives: [MdDataTable],
    template: `
    <md-content>
    <md-data-table [columns]="columns" [model]="model"
        (rowClick)="rowClick($event)">
      <template #data="data">{{data.name}}</template>
      <template #data="data">{{data.callSign}}</template>
      <template #data="data">{{data.value}}</template>
      <template #data="data">{{data.date}}</template>
    </md-data-table>
    </md-content>
    `
  })
  class TestComponent {
    columns: MdDataTableColumn[] = testColumns;
    model: any[] = testModel;

    constructor() {
      // console.log('testCmp', this.columns);
    }

    rowClick(e) {
      // NOOP spy on me.
    }
  }

  describe('DataTable', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<ITestFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('md-data-table'));
        return {
          fixture: fixture,
          component: debug.componentInstance,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-data-table', () => {
      it('should be created and destroyed', injectAsync([], () => {
        return setup().then((api: ITestFixture) => api.fixture.destroy());
      }));

      describe('Table Header', () => {
        it('should track a columns model', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.columns).toBe(testColumns);
          });
        }));

        it('should render column headings based on columns model', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            let headings = api.debug.queryAll(By.css('th'));
            expect(headings.length).toBe(4);
          });
        }));

        it('should render a heading checkbox if table is "selectable"', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            // not selectable, no checkbox should be rendered:
            let checkbox = api.debug.query(By.css('md-checkbox'));
            expect(checkbox).toBeFalsy();

            // make it selectable and expect to be rendered:
            api.component.selectable = true;
            checkbox = api.debug.query(By.css('md-checkbox'));
            expect(checkbox).toBeDefined();
          });
        }));

        describe('sortingColumn', () => {
          it('should track column to sort by based on colum head clicks', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {
              expect(api.component.sortingColumn).toBeFalsy();
              let th = api.debug.query(By.css('th'));
              th.nativeElement.click();
              expect(api.component.sortingColumn).toBe(api.component.columns[0]);
            });
          }));

          /*it('should sort rows using column.comparator, when present', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {
              let COLUMN_INDEX = 3;
              let ths = api.debug.queryAll(By.css('th'));
              let th = ths[COLUMN_INDEX];
              let comparatorSpy = spyOn(api.component.columns[COLUMN_INDEX], 'comparator');
              th.nativeElement.click();
              let rows = api.debug.queryAll(By.css('[md-data-row]'));
              expect(comparatorSpy).toHaveBeenCalled();
            });
          }));*/
        });

      });

      describe('Table Body', () => {

        describe('row rendering', () => {
          it('should render a row for each model entry', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {
              let rows = api.debug.queryAll(By.css('[md-data-row]'));
              expect(rows.length).toBe(4);
            });
          }));

          it('should pass model to row', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {
              let rows = api.debug.queryAll(By.css('[md-data-row]'));
              for (var i in rows) {
                expect(rows[i].componentInstance.data).toBe(testModel[i]);
              }
            });
          }));

          it('should render rows in sortingColumn order', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {
              let ths = api.debug.queryAll(By.css('th'));
              ths[2].nativeElement.click();
              let rows = api.debug.queryAll(By.css('[md-data-row]'));
              expect(rows[0].componentInstance.data).toBe(testModel[1]);
              expect(rows[1].componentInstance.data).toBe(testModel[3]);
              expect(rows[2].componentInstance.data).toBe(testModel[0]);
              expect(rows[3].componentInstance.data).toBe(testModel[2]);
            });
          }));

        });

        describe('rowClick', () => {
          it('should emit the model item for the row', injectAsync([], () => {
            return setup().then((api: ITestFixture) => {

              let rowClickSpy = spyOn(api.fixture.componentInstance, 'rowClick');
              // console.log("rowClickSpy", rowClickSpy);
              let rows = api.debug.queryAll(By.css('[md-data-row]'));
              let model = api.component.model;
              for (let i in rows) {
                rows[i].nativeElement.click();
                expect(rowClickSpy).toHaveBeenCalled();
                // expect(rowClickSpy).toHaveBeenCalledWith(model[i]);
              }
            });
          }));
        });
      });

      describe('align', () => {});
    });

    describe('md-sidenav-container', () => {});

  });
}

