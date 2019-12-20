import reactChildrenSchema from "../../data-utilities/react-children.schema";

export default {
    $schema: "http://json-schema.org/schema#",
    title: "Component with children",
    description: "A test component's schema definition.",
    type: "object",
    id: "children",
    properties: {
        objectContainingNestedChildren: {
            title: "Object with nested children",
            type: "object",
            properties: {
                nestedObjectChildren: {
                    title: "Children in object",
                    ...reactChildrenSchema,
                },
            },
        },
        arrayContainingNestedChildren: {
            title: "Array with nested children",
            type: "array",
            items: {
                title: "Nested array item",
                type: "object",
                properties: {
                    nestedArrayChildren: {
                        title: "Children",
                        ...reactChildrenSchema,
                    },
                },
            },
        },
        children: {
            title: "Children",
            ...reactChildrenSchema,
            defaults: ["text"],
            examples: ["Foo"],
        },
        restrictedWithChildren: {
            title: "Restricted children with react defaults",
            ...reactChildrenSchema,
            ids: ["objects", "arrays"],
            defaults: ["text"],
        },
        restrictedChildrenWithReactDefaults: {
            title: "Restricted children without react defaults",
            ...reactChildrenSchema,
            ids: ["children"],
        },
    },
    required: ["children"],
};
