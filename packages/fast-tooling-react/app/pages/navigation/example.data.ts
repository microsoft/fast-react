import { ChildOptionItem } from "../../../src";
import { get } from "lodash-es";

import noChildrenSchema from "./no-children.schema.json";
import childrenSchema from "./children.schema.json";

const noChildren: any = {
    text: "Hello world",
};

const children: any = {
    foo: "Bar",
    children: [
        "Foo",
        {
            id: get(childrenSchema, "id"),
            props: {
                children: [
                    {
                        id: get(childrenSchema, "id"),
                        props: {
                            children: [
                                {
                                    id: get(childrenSchema, "id"),
                                    props: {
                                        children: [
                                            {
                                                id: get(childrenSchema, "id"),
                                                props: {
                                                    children: {
                                                        id: get(noChildrenSchema, "id"),
                                                        props: noChildren,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    id: get(childrenSchema, "id"),
                                    props: {
                                        children: {
                                            id: get(noChildrenSchema, "id"),
                                            props: noChildren,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            id: get(noChildrenSchema, "id"),
            props: noChildren,
        },
        {
            id: get(childrenSchema, "id"),
            props: {
                children: {
                    id: get(noChildrenSchema, "id"),
                    props: noChildren,
                },
            },
        },
        {
            id: get(childrenSchema, "id"),
            props: {
                children: [
                    {
                        id: get(childrenSchema, "id"),
                        props: {
                            children: {
                                id: get(noChildrenSchema, "id"),
                                props: noChildren,
                            },
                        },
                    },
                    {
                        id: get(childrenSchema, "id"),
                        props: {
                            children: {
                                id: get(noChildrenSchema, "id"),
                                props: noChildren,
                            },
                        },
                    },
                ],
            },
        },
    ],
    object: {
        children: [
            {
                id: get(noChildrenSchema, "id"),
                props: noChildren,
            },
            "Foo",
        ],
    },
    array: [
        {
            children: [
                {
                    id: get(noChildrenSchema, "id"),
                    props: noChildren,
                },
                "Bar",
            ],
        },
    ],
};

const childOptions: ChildOptionItem[] = [
    {
        component: null,
        schema: noChildrenSchema,
    },
    {
        component: null,
        schema: childrenSchema,
    },
];

export { children, childOptions, noChildren };
