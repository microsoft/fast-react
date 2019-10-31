import {
    NavigationDataType,
    TreeNavigation,
} from "../../src/navigation/navigation.props";
import { ChildOptionItem } from "../../src";
import { get } from "lodash-es";

import noChildrenSchema from "./no-children.schema.json";
import childrenSchema from "./children.schema.json";

const noChildren: any = {
    text: "Hello world",
};

const children: any = {
    children: [
        "Foo",
        {
            id: get(noChildrenSchema, "id"),
            props: noChildren,
        },
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
