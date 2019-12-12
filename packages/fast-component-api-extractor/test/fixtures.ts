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
    // tslint:disable-next-line
    intrinsicsArrayTwo: Array<any>;
    globalReferenceArray: Date[];
    // tslint:disable-next-line
    intrinsicsUnionArray: (string | number)[];
    intrinsicsUnionArrayTwo: Array<string | number>;
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
