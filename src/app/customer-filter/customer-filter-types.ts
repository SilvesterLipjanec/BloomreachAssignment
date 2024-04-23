// CustomerEventsResponse -------------------------------------------------------- 

export interface CustomerEventsResponse {
    events: CustomerEvent[];
}

export interface CustomerEvent {
    type: string;
    properties: CustomerEventProperty[];
}

export interface CustomerEventProperty {
    property: string;
    type: "string" | "number";
}

// CustomerFilter ----------------------------------------------------------------

export type CustomerFilter = CustomerFilterStep[];

export interface CustomerFilterStep {
    name: string;
    event: CustomerFilterEvent | null;
}

export interface CustomerFilterEvent {
    type: string;
    attributes: CustomerFilterAttribute[];
}

export type CustomerFilterAttribute = {
    property: string | null;
    operator: CustomerFilterStringOperator | CustomerFilterNumberOperator | null;
    value: string | number | null;
    value2?: number;
}
// & (CustomerFilterStringProperty | CustomerFilterNumberProperty);

// export interface CustomerFilterStringProperty {
//     operator: CustomerFilterStringOperator | null;
// }

// export interface CustomerFilterNumberProperty {
//     value1: number;

// }

export type CustomerFilterStringOperator = "equals" | "does_not_equals" | "contains" | "does_not_contain";
export type CustomerFilterNumberOperator = "equal_to" | "in_between" | "less_than" | "greater_than";

// CustomerFilterOperator -----------------------------------------------------

export interface CustomerFilterOperator {
    type: "string" | "number";
    values: CustomerFilterOperatorValue[];
}

export interface CustomerFilterOperatorValue {
    id: CustomerFilterStringOperator | CustomerFilterNumberOperator;
    name: string;

}

export const CUSTOMER_FILTER_OPERATORS: CustomerFilterOperator[] = [{
    type: "string",
    values: [{
        id: "equals",
        name: "equals"
    },
    {
        id: "does_not_equals",
        name: "does not equals"
    },
    {
        id: "contains",
        name: "contains"
    },
    {
        id: "does_not_contain",
        name: "does not contain"
    }
    ]
},
{
    type: "number",
    values: [{
        id: "equal_to",
        name: "equal to"
    },
    {
        id: "in_between",
        name: "in between"
    },
    {
        id: "less_than",
        name: "less than"
    },
    {
        id: "greater_than",
        name: "greater than"
    }
    ]
}];
