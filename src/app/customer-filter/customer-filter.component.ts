import { Component, EventEmitter, inject, Output, output, ViewEncapsulation } from '@angular/core';
import { CUSTOMER_FILTER_OPERATORS, CustomerEvent, CustomerEventProperty, CustomerFilter, CustomerFilterAttribute, CustomerFilterEvent, CustomerFilterNumberOperator, CustomerFilterOperatorValue, CustomerFilterStep, CustomerFilterStringOperator, SupportedPropertyTypes } from './customer-filter-types';
import { CustomerFilterGatewayService } from './customer-filter-gateway.service';

interface DropwdownDefinition {
    id: string;
    name: string;
}

@Component({
    selector: 'app-customer-filter',
    templateUrl: './customer-filter.component.html',
    styleUrls: ['./customer-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerFilterComponent {

    @Output("filterChange") filterChange = new EventEmitter<CustomerFilter>()

    private defaultFilterStep: CustomerFilterStep = {
        name: "Unnamed step",
        event: null
    }

    private customerFilterGateway = inject(CustomerFilterGatewayService)

    customerEvents?: CustomerEvent[];
    events: DropwdownDefinition[] = [];
    propertiesByEventsLookup: Record<string, DropwdownDefinition[]> = {};
    filterTypeOperatorsLookup: Record<string, DropwdownDefinition[]> = {};
    eventPropertiesLookup: Record<string, Record<string, CustomerEventProperty>> = {};

    isFilterStepEditable = false;

    filterSteps: CustomerFilter = [{ ...this.defaultFilterStep }];

    ngOnInit(): void {

        this.customerFilterGateway.getCustomerEvents().subscribe((customerEvents: CustomerEvent[]) => {
            this.customerEvents = customerEvents

            this.eventPropertiesLookup = Object.fromEntries(customerEvents.map((event) => [event.type,
            Object.fromEntries(event.properties.map(prop => [prop.property, prop]))]));

            this.propertiesByEventsLookup = Object.fromEntries(customerEvents.map((event) => [event.type, event.properties.map(prop => ({ id: prop.property, name: prop.property }))]));
            this.events = Object.keys(this.propertiesByEventsLookup).map(event => ({ id: event, name: event } as DropwdownDefinition));
        });

        this.filterTypeOperatorsLookup = Object.fromEntries(CUSTOMER_FILTER_OPERATORS.map(operatorGroup => [operatorGroup.type, operatorGroup.values as DropwdownDefinition[]]))
    }

    addFilterStep(): void {
        this.filterSteps.push({ ...this.defaultFilterStep });
        this.onFilterChange();
    }

    discardFilters(): void {
        this.filterSteps = [{ ...this.defaultFilterStep }]
        this.onFilterChange();
    }

    applyFilters(): void {
        console.log(this.filterSteps);
    }

    changeFilterStepEvent(type: string, filterStep: CustomerFilterStep): void {
        filterStep.event = {
            type: type,
            attributes: []
        }
        this.onFilterChange();
    }

    addEventAttribute(filterEvent: CustomerFilterEvent): void {
        filterEvent.attributes = filterEvent.attributes || [];
        filterEvent.attributes.push({ property: null, propertyType: "string", operator: null, value: null })
        this.onFilterChange();
    }

    changeFilterEventAttribute(property: string, eventType: string, filterAttribute: CustomerFilterAttribute): void {
        filterAttribute.property = property;
        filterAttribute.propertyType = this.getEventPropertyType(eventType, property);
        if (filterAttribute.propertyType === "string") {
            this.changeFilterAttributeOperator("equals", filterAttribute);
        } else {
            this.changeFilterAttributeOperator("equal_to", filterAttribute);
        }
        this.onFilterChange();
    }

    getEventPropertyType(eventType: string, property: string): SupportedPropertyTypes {
        return this.eventPropertiesLookup[eventType][property].type;
    }

    changeFilterAttributeOperator(operator: CustomerFilterNumberOperator | CustomerFilterStringOperator, filterAttribute: CustomerFilterAttribute): void {
        filterAttribute.operator = operator;
        if (operator === "in_between" && filterAttribute.value2 == null) {
            filterAttribute.value = 0;
            filterAttribute.value2 = 0;
        } else {
            filterAttribute.value = null;
            delete filterAttribute.value2;
        }
        this.onFilterChange();
    }


    removeFilterAttribute(filterAttributes: CustomerFilterAttribute[], attributeIndex: number): void {
        filterAttributes.splice(attributeIndex, 1);
        this.onFilterChange();
    }

    removeFilterStep(stepIndex: number): void {
        this.filterSteps.splice(stepIndex, 1);
        this.onFilterChange();
    }

    duplicateFilterStep(stepIndex: number): void {
        this.filterSteps.splice(stepIndex, 0, { ...this.filterSteps[stepIndex] });
        this.onFilterChange();
    }

    onFilterChange(): void {
        this.filterChange.emit(this.filterSteps);
    }

}
