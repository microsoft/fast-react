interface IntrinsicsFixture {
    any: any;
    boolean: boolean;
    number: number;
    object: object;
    string: string;
    unknown: unknown;
    tuple: [];
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
}

interface TestFixture {
    function: () => void;
}
