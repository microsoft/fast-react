interface IntrinsicFixture {
    any: any;
    optionalAny?: any;
    boolean: boolean;
    number: number;
    object: object;
    string: string;
    unknown: unknown;
}

enum DefaultNumericEnum {
    one,
    two,
    three,
}
enum AssignedNumericEnum {
    /**
     * Comment
     */
    one = 1,
    two = 2,
    three = 3,
}
enum StringNumericEnum {
    one = "one",
    two = "two",
    three = "three",
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
    window: Window;
    json: JSON;
    customInterfaceReference: IntrinsicFixture;
}

export interface EnumFixture {
    enum: DefaultEnum;
}

interface FunctionFixture {
    noArgs: () => void;
    intrinsicReturn: () => boolean;
    intrinsicArg: (value: string) => boolean;
    intrinsicArgs: (value: string, anotherValue: boolean) => boolean;
    optionalIntrinsicArg: (value?: string) => boolean;
}

interface ExtendsInterfaceFixture extends IntrinsicFixture {
    property: string;
}
