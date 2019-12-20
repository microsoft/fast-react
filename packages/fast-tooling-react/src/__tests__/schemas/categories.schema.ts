import { childrenSchema, ChildrenType } from "@microsoft/fast-tooling";

export default {
    $schema: "http://json-schema.org/schema#",
    title: "Component with categories",
    description: "A test component's schema definition.",
    type: "object",
    id: "categories",
    propertyTitle: "Item key",
    properties: {
        uncategorizedString: {
            title: "Uncategorized String",
            type: "string",
        },
        uncategorizedBoolean: {
            title: "Uncategorized Boolean",
            type: "boolean",
        },
        categorizedString: {
            title: "String",
            type: "string",
        },
        toggle: {
            title: "Required Checkbox",
            type: "boolean",
        },
        optionalToggle: {
            title: "Optional Checkbox",
            type: "boolean",
        },
        defaultToggle: {
            title: "Default Checkbox",
            type: "boolean",
            default: true,
        },
        disabledToggle: {
            title: "Disabled Checkbox",
            type: "boolean",
            disabled: true,
        },
        optionalNull: {
            title: "optional null",
            type: "null",
        },
        requiredNull: {
            title: "required null",
            type: "null",
        },
        children: {
            ...childrenSchema,
            allowTypes: [ChildrenType.string, ChildrenType.component],
            examples: ["Foo"],
        },
        restrictedWithChildren: {
            ...childrenSchema,
            allowTypes: [ChildrenType.string, ChildrenType.component],
            title: "Restricted children with react defaults",
            ids: ["objects", "arrays"],
            defaults: ["text"],
        },
    },
    formConfig: {
        categories: [
            {
                title: "Textarea",
                expandable: true,
                items: ["categorizedString"],
            },
            {
                title: "Checkbox",
                expandable: true,
                items: ["toggle", "optionalToggle", "defaultToggle", "disabledToggle"],
            },
            {
                title: "Children",
                items: ["children", "restrictedWithChildren"],
            },
            {
                title: "Null",
                items: ["optionalNull", "requiredNull"],
            },
        ],
    },
    additionalProperties: {
        title: "Additional strings",
        type: "string",
        examples: ["bar"],
    },
    required: ["toggle", "requiredNull"],
};
