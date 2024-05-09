import { Component, ViewChild, viewChild } from '@angular/core';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InterviewAssignment';

  @ViewChild(CustomerFilterComponent) appCustomerFilter?: CustomerFilterComponent;

  discardFilters(): void {
    this.appCustomerFilter?.discardFilters();
  }
}
