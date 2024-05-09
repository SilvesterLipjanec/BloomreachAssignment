import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appPanelHeader]',
  standalone: true
})
export class AppPanelHeaderDirective {

  headerTemplate = inject(TemplateRef);

}
