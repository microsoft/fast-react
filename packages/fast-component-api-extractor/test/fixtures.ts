interface IntrinsicsFixture {
    any: any;
    optionalAny?: any;
    boolean: boolean;
    number: number;
    object: object;
    string: string;
    unknown: unknown;
    tuple: [];
    tupleWithIntrinsicElements: [any, number, string];
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
    customInterfaceReference: IntrinsicsFixture;
}

interface TestFixture {
    function: () => void;
}
