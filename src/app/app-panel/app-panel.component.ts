import { Component, ContentChild, TemplateRef } from '@angular/core';
import { AppPanelHeaderDirective } from './app-panel-header.directive';

@Component({
  selector: 'app-panel',
  templateUrl: './app-panel.component.html',
  styleUrl: './app-panel.component.scss'
})
export class AppPanelComponent {
  @ContentChild(AppPanelHeaderDirective) _panelHeader: AppPanelHeaderDirective | undefined;
}
