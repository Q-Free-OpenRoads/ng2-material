import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from "angular2/core";

@Directive({
  selector: '[md-data-cell]'
})
export class MdDataCell {
  @Input() data: any;
  @Input() templ: TemplateRef;

  childView: EmbeddedViewRef;

  constructor(private _viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.childView = this._viewContainer.createEmbeddedView(this.templ);
    this.childView.setLocal('data', this.data);
  }
}
