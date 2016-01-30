///<reference path="../node_modules/angular2/typings/jasmine/jasmine.d.ts"/>
import {DebugElement, Component, View, provide} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ComponentFixture} from "angular2/testing";
import {
  AsyncTestCompleter,
  TestComponentBuilder,
  beforeEach,
  beforeEachProviders,
  describe,
  inject,
  it
} from "angular2/testing_internal";
import {MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES} from "../ng2-material/all";
import {UrlResolver} from "angular2/compiler";
import {TestUrlResolver} from "./test_url_resolver";
import {TimerWrapper} from "angular2/src/facade/async";


/** Gets a child DebugElement by tag name. */
export function findChildByTag(parent: DebugElement, tagName: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets a child DebugElement by attribute name. */
export function findChildByAttribute(parent: DebugElement, attr: string): DebugElement {
  return parent.query((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });
}
/** Gets all children by tag name. */
export function findChildrenByTag(parent: DebugElement, tagName: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets all children by tag name. */
export function findChildrenByAttribute(parent: DebugElement, attr: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });

}
/**
 * Get a child DebugElement by id
 */
export function findChildById(parent: DebugElement, id: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement.id.toLowerCase() === id.toLowerCase();
  });
}


/**
 * Find a component child by it's instance type.
 */
export function findComponentByType(debug: DebugElement, type: any): any {
  let found = debug.query((debugEl: DebugElement) => {
    return debugEl.componentInstance instanceof type;
  });
  return found ? found.componentInstance : null;
}

/**
 * Find a debug child by it's instance type.
 */
export function findDebugByType(debug: DebugElement, type: any): any {
  return debug.query((debugEl: DebugElement) => {
    return debugEl.componentInstance instanceof type;
  });
}

/**
 * Run a basic lifecycle sanity check on a component. This will create the given component
 * template, wait a few moments, then destroy it.
 * @param name The name for the describe block
 * @param selector The selector that's being tested (for inner describe)
 * @param template The template that contains the component usage.
 */
export function componentSanityCheck(name: string, selector: string, template: string) {
  @Component({selector: 'test-app'})
  @View({
    directives: [MATERIAL_DIRECTIVES],
    template: template
  })
  class TestComponent {
  }

  describe(name, () => {
    let builder: TestComponentBuilder;

    function setup(): Promise<any> {
      return builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          return fixture;
        })
        .catch(console.error.bind(console));
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe(selector, () => {
      it('should instantiate component without fail', inject([AsyncTestCompleter], (async) => {
        setup().then(() => TimerWrapper.setTimeout(() => async.done(), 10));
      }));
      it('should destroy component without fail', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ComponentFixture) => {
          api.destroy();
          TimerWrapper.setTimeout(() => async.done(), 10);
        });
      }));
    });

  });

}
