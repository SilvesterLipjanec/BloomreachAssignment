import { Component, inject } from '@angular/core';
import { CustomerEvent, CustomerFilter, CustomerFilterStep } from './customer-filter-types';
import { CustomerFilterGatewayService } from './customer-filter-gateway.service';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent {

  customerEvents?: CustomerEvent[];

  private defaultStepName = "Unnamed step";

  private defaultFilterStep: CustomerFilterStep = {
    name: this.defaultStepName,
    event: null
  }

  filterValue: CustomerFilter = [this.defaultFilterStep];



  private customerFilterGateway = inject(CustomerFilterGatewayService)

  ngOnInit(): void {

    this.customerFilterGateway.getCustomerEvents().subscribe(customerEvents => this.customerEvents = customerEvents);

  }

  addFilterStep(): void {
    this.filterValue.push(this.defaultFilterStep)
  }

  discardFilters(): void {
    this.filterValue = [this.defaultFilterStep]
  }

  applyFilters(): void {
    console.log(this.filterValue);
  }
}
