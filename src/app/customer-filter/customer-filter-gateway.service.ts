import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CustomerEvent, CustomerEventsResponse } from './customer-filter-types';

@Injectable({
  providedIn: 'root'
})
export class CustomerFilterGatewayService {

  
  private customerEventsUrl = "https://br-fe-assignment.github.io/customer-events/events.json";
  
  private httpClient = inject(HttpClient);
  
  getCustomerEvents(): Observable<CustomerEvent[]> {
      return this.httpClient.get<CustomerEventsResponse>(this.customerEventsUrl).pipe(
          map((response: CustomerEventsResponse) => response.events)
      );
  }
}
