import {
    badgeSchema,
    childrenSchema,
    textFieldSchema,
} from "../../../src/__tests__/schemas";
import { ChildOptionItem } from "../../../src/index";

const textFieldJSXName: string = "TextField";
const childrenJSXName: string = "Children";
const badgeJSXName: string = "Badge";

export const childOptions: ChildOptionItem[] = [
    {
        name: textFieldJSXName,
        schema: textFieldSchema,
        component: null,
    },
    {
        name: childrenJSXName,
        schema: childrenSchema,
        component: null,
    },
    {
        name: badgeJSXName,
        schema: badgeSchema,
        component: null,
    },
];

const exampleData: any[] = [
    {
        exampleName: "Basic",
        config: {
            data: {},
            componentName: "Badge",
            schema: badgeSchema,
        },
    },
    {
        exampleName: "Nested",
        config: {
            data: {
                children: {
                    id: badgeSchema.id,
                    props: {},
                },
            },
            componentName: "Children",
            schema: childrenSchema,
        },
    },
    {
        exampleName: "Nested with props",
        config: {
            data: {
                children: {
                    id: badgeSchema.id,
                    props: {
                        string: "bar",
                        children: "foo",
                    },
                },
            },
            componentName: "Children",
            schema: childrenSchema,
        },
    },
    {
        exampleName: "Nested with multiple",
        config: {
            data: {
                children: [
                    {
                        id: badgeSchema.id,
                        props: {
                            children: "foo",
                        },
                    },
                    {
                        id: badgeSchema.id,
                        props: {
                            children: "bar",
                        },
                    },
                ],
            },
            componentName: "Children",
            schema: childrenSchema,
        },
    },
    {
        exampleName: "Attributes",
        config: {
            data: {
                string: "foo",
                children: {
                    id: badgeSchema.id,
                    props: {
                        string: "bar",
                        children: "bat",
                    },
                },
            },
            componentName: "Badge",
            schema: badgeSchema,
        },
    },
    {
        exampleName: "Variables",
        config: {
            object: {
                number: 42,
            },
            componentName: "Badge",
            schema: badgeSchema,
        },
    },
];

export default exampleData;
