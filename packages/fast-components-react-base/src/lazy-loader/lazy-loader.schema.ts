export default {
    $schema: "http://json-schema.org/schema#",
    title: "Viewport virtualizer",
    description: "A viewport virtualizer component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/lazy-loader",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            defaults: ["text"],
        },
    },
};
