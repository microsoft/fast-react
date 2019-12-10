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

interface ArrayFixture {
    intrinsicArray: any[];
    referenceArray: Date[];
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

interface TestFixture {
    function: () => void;
}
