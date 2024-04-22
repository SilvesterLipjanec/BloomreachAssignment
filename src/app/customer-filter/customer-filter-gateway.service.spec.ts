import { TestBed } from '@angular/core/testing';

import { CustomerFilterGatewayService } from './customer-filter-gateway.service';

describe('CustomerFilterGatewayService', () => {
  let service: CustomerFilterGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFilterGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
