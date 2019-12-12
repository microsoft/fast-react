interface IntrinsicFixture {
    any: any;
    optionalAny?: any;
    boolean: boolean;
    number: number;
    object: object;
    string: string;
    unknown: unknown;
}

interface TupleFixture {
    tuple: [];
    tupleWithIntrinsicElements: [any, number, string];
    tupleWithReferenceElements: [Date, ArrayFixture];
}

interface IntersectionA {
    prop: any;
}

interface IntersectionB {
    prop: any;
}

interface ArrayFixture {
    intrinsicArray: any[];
    // tslint:disable-next-line
    intrinsicArrayReference: Array<any>;
    globalReferenceArray: Date[];
    // tslint:disable-next-line
    intrinsicsUnionArray: (string | number)[];
    intrinsicsUnionArrayReference: Array<string | number>;
    // tslint:disable-next-line
    referenceIntersectionArray: (IntersectionA & IntersectionB)[];
    referenceIntersectionArrayReference: Array<IntersectionA & IntersectionB>;
}

interface ReferenceFixture {
    date: Date;
    error: Error;
    regexp: RegExp;
    math: Math;
    global: Window;
    json: JSON;
    customInterfaceReference: IntrinsicFixture;
}

interface FunctionFixture {
    noArgs: () => void;
}
