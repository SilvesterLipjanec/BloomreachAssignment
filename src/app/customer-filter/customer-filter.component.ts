import { Component, inject } from '@angular/core';
import { CUSTOMER_FILTER_OPERATORS, CustomerEvent, CustomerEventProperty, CustomerFilter, CustomerFilterAttribute, CustomerFilterEvent, CustomerFilterNumberOperator, CustomerFilterOperatorValue, CustomerFilterStep, CustomerFilterStringOperator } from './customer-filter-types';
import { CustomerFilterGatewayService } from './customer-filter-gateway.service';
interface DropwdownDefinition {
    id: string;
    name: string;
}

@Component({
    selector: 'app-customer-filter',
    templateUrl: './customer-filter.component.html',
    styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent {

    customerEvents?: CustomerEvent[];
    events: DropwdownDefinition[] = [];
    propertiesByEventsLookup: Record<string, DropwdownDefinition[]> = {};

    eventPropertyTypesLookup: Record<string, Record<string, string>> = {};
    filterTypeOperatorsLookup: Record<string, CustomerFilterOperatorValue[]> = {};

    private defaultStepName = "Unnamed step";

    private defaultFilterStep: CustomerFilterStep = {
        name: this.defaultStepName,
        event: null
    }

    filterSteps: CustomerFilter = [{ ...this.defaultFilterStep }];

    test = "tests"
    eventDropdownPlaceholder = "Select an event";
    filterPanelHeaderText = "Customer filter";
    stepNameText = "Step";
    addEventAttributeText = "+ Add event attribute";
    refineMoreAttributeText = "Refine more";
    attributeDropdownPlaceholder = "Select an attribute";
    andText = "AND";
    addNextStepText = "+ ADD FUNNEL STEP";

    private customerFilterGateway = inject(CustomerFilterGatewayService)



    ngOnInit(): void {

        this.customerFilterGateway.getCustomerEvents().subscribe((customerEvents: CustomerEvent[]) => {
            this.customerEvents = customerEvents

            this.eventPropertyTypesLookup = Object.fromEntries(customerEvents.map((event) => [event.type,
            Object.fromEntries(event.properties.map(prop => [prop.property, prop.type]))]));

            this.propertiesByEventsLookup = Object.fromEntries(customerEvents.map((event) => [event.type, event.properties.map(prop => ({ id: prop.property, name: prop.property }))]));
            this.events = Object.keys(this.propertiesByEventsLookup).map(event => ({ id: event, name: event } as DropwdownDefinition));
        });

        this.filterTypeOperatorsLookup = Object.fromEntries(CUSTOMER_FILTER_OPERATORS.map(operatorGroup => [operatorGroup.type, operatorGroup.values]))
    }

    addFilterStep(): void {
        this.filterSteps.push({ ...this.defaultFilterStep })
    }

    discardFilters(): void {
        this.filterSteps = [{ ...this.defaultFilterStep }]
    }

    applyFilters(): void {
        console.log(this.filterSteps);
    }

    changeFilterStepEvent(type: string, filterStep: CustomerFilterStep): void {
        filterStep.event = {
            type: type,
            attributes: []
        }
    }

    addEventAttribute(filterEvent: CustomerFilterEvent): void {
        filterEvent.attributes = filterEvent.attributes || [];
        filterEvent.attributes.push({ property: null, operator: null, value: null })
    }

    changeFilterEventAttribute(property: string, eventType: string, filterAttribute: CustomerFilterAttribute): void {
        filterAttribute.property = property;
        if (this.eventPropertyTypesLookup[eventType][property] === "string") {
            this.changeFilterAttributeOperator("equals", filterAttribute);
        } else {
            this.changeFilterAttributeOperator("equal_to", filterAttribute);
        }

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
    }

    removeFilterAttribute(filterAttributes: CustomerFilterAttribute[], attributeIndex: number): void {
        filterAttributes.splice(attributeIndex, 1);
    }

    removeFilterStep(stepIndex: number): void {
        this.filterSteps.splice(stepIndex, 1);
    }

    duplicateFilterStep(stepIndex: number): void {
        this.filterSteps.splice(stepIndex, 0, { ...this.filterSteps[stepIndex] });
    }
}
