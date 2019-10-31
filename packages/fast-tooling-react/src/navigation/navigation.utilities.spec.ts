import "jest";
import {
    ComponentDataNavigation,
    ComponentNavigation,
    ComponentSchemaNavigation,
    getDragHoverState,
    getNavigation,
    getNavigationFromComponent,
    getNavigationFromComponentData,
    getNavigationFromComponentSchema,
    ReactChildren,
    ReactComponent,
    ReactComponentProps,
    TreeNavigationConfig,
} from "./navigation.utilities";
import { NavigationDataType, NavigationState, TreeNavigation } from "./navigation.props";
import { ChildOptionItem } from "../data-utilities";

import noChildrenSchema from "../../app/configs/no-children.schema.json";
import childrenSchema from "../../app/configs/children.schema.json";
import { TargetPosition } from "../data-utilities/relocate";

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

/**
 * Gets the navigation
 */
describe("getNavigation", () => {
    test("should get the navigation of a component containing a single primitive", () => {
        const navigation: TreeNavigationConfig = getNavigation(
            {
                children: "a",
            },
            {
                type: "object",
                reactProperties: {
                    children: {
                        type: "children",
                    },
                    otherChildren: {
                        type: "children",
                    },
                },
            }
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(4);
        expect(navigation[0][navigationKeys[3]].text).toEqual("a");
        expect(navigation[0][navigationKeys[3]].relativeDataLocation).toEqual("children");
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
    });
    test("should get the navigation of a componant containing multiple primitives", () => {
        const navigation: TreeNavigationConfig = getNavigation(
            {
                children: ["a", "b"],
            },
            {
                type: "object",
                reactProperties: {
                    children: {
                        type: "children",
                    },
                    otherChildren: {
                        type: "children",
                    },
                },
            }
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(5);
        expect(navigation[0][navigationKeys[3]].text).toEqual("a");
        expect(navigation[0][navigationKeys[3]].relativeDataLocation).toEqual(
            "children[0]"
        );
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
        expect(navigation[0][navigationKeys[4]].text).toEqual("b");
        expect(navigation[0][navigationKeys[4]].relativeDataLocation).toEqual(
            "children[1]"
        );
        expect(navigation[0][navigationKeys[4]].parent).toEqual(navigationKeys[1]);
    });
    test("should get the navigation of a component containing a single child component", () => {
        const navigation: TreeNavigationConfig = getNavigation(
            {
                children: {
                    id: childOptions[0].schema.id,
                    props: {},
                },
            },
            childOptions[1].schema,
            childOptions
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(4);
        expect(navigation[0][navigationKeys[0]].parent).toEqual(undefined);
        expect(navigation[0][navigationKeys[0]].items).toEqual([
            navigationKeys[1],
            navigationKeys[2],
        ]);
        expect(navigation[0][navigationKeys[1]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[1]].items).toEqual([navigationKeys[3]]);
        expect(navigation[0][navigationKeys[2]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
    });
    test("should get the navigation of a component containing nested child components", () => {
        const navigation: TreeNavigationConfig = getNavigation(
            {
                children: {
                    id: childOptions[1].schema.id,
                    props: {
                        children: {
                            id: childOptions[0].schema.id,
                            props: {},
                        },
                    },
                },
            },
            childOptions[1].schema,
            childOptions
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(7);
        expect(navigation[0][navigationKeys[0]].parent).toEqual(undefined);
        expect(navigation[0][navigationKeys[0]].items).toEqual([
            navigationKeys[1],
            navigationKeys[2],
        ]);
        expect(navigation[0][navigationKeys[1]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[1]].items).toEqual([navigationKeys[3]]);
        expect(navigation[0][navigationKeys[2]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
        expect(navigation[1]).toEqual(navigationKeys[0]);
    });
    test("should get the navigation of a component with complex objects containing nested child components", () => {
        const navigation: TreeNavigationConfig = getNavigation(
            {
                a: {
                    b: {
                        id: childOptions[0].schema.id,
                        props: {},
                    },
                },
            },
            {
                type: "object",
                properties: {
                    a: {
                        type: "object",
                        reactProperties: {
                            b: {
                                type: "children",
                            },
                        },
                    },
                },
            },
            childOptions
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(4);
        expect(navigation[0][navigationKeys[0]].parent).toEqual(undefined);
        expect(navigation[0][navigationKeys[0]].items).toEqual([navigationKeys[2]]);
        expect(navigation[0][navigationKeys[1]].parent).toEqual(navigationKeys[2]);
        expect(navigation[0][navigationKeys[1]].items).toEqual([navigationKeys[3]]);
        expect(navigation[0][navigationKeys[2]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[2]].items).toEqual([navigationKeys[1]]);
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
        expect(navigation[0][navigationKeys[3]].items).toEqual([]);
        expect(navigation[1]).toEqual(navigationKeys[0]);
    });
    test("should return multiple properties if a data blob with multiple components have nested components has been passed", () => {
        const childrenComponent: ReactComponentProps = {
            children: [
                {
                    id: childOptions[1].schema.id,
                    props: {
                        children: {
                            id: childOptions[0].schema.id,
                            props: {},
                        },
                    },
                },
                "Foo",
            ],
        };
        const data: any = childrenComponent;
        const navigation: TreeNavigationConfig = getNavigation(
            data,
            childrenSchema,
            childOptions
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(8);
        expect(navigation[0][navigationKeys[0]].parent).toEqual(undefined);
        expect(navigation[0][navigationKeys[0]].items).toEqual([
            navigationKeys[1],
            navigationKeys[2],
        ]);
        expect(navigation[0][navigationKeys[1]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[1]].items).toEqual([
            navigationKeys[3],
            navigationKeys[7],
        ]);
        expect(navigation[0][navigationKeys[2]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[2]].items).toEqual([]);
        expect(navigation[0][navigationKeys[3]].parent).toEqual(navigationKeys[1]);
        expect(navigation[0][navigationKeys[3]].items).toEqual([
            navigationKeys[4],
            navigationKeys[5],
        ]);
        expect(navigation[0][navigationKeys[4]].parent).toEqual(navigationKeys[3]);
        expect(navigation[0][navigationKeys[4]].items).toEqual([navigationKeys[6]]);
        expect(navigation[0][navigationKeys[5]].parent).toEqual(navigationKeys[3]);
        expect(navigation[0][navigationKeys[5]].items).toEqual([]);
        expect(navigation[0][navigationKeys[6]].parent).toEqual(navigationKeys[4]);
        expect(navigation[0][navigationKeys[6]].items).toEqual([]);
        expect(navigation[0][navigationKeys[7]].parent).toEqual(navigationKeys[1]);
        expect(navigation[0][navigationKeys[7]].items).toEqual([]);
    });
});

/**
 * Gets the navigation from a component
 */
describe("getNavigationFromComponent", () => {
    test("should get the navigation from a component with no properties", () => {
        const navigation: ComponentNavigation = getNavigationFromComponent({}, {});
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[0][navigationKeys[0]].schemaLocation).toEqual("");
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[1]).toEqual([]);
        expect(navigation[2]).toEqual([]);
        expect(navigation[3]).toEqual(navigationKeys[0]);
    });
    test("should get the navigation from a component with child components", () => {
        const navigation: ComponentNavigation = getNavigationFromComponent(
            {
                children: {
                    id: "a",
                    props: {},
                },
            },
            {
                type: "object",
                reactProperties: {
                    children: {
                        type: "children",
                    },
                    otherChildren: {
                        type: "children",
                    },
                },
            }
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(3);
        expect(navigation[0][navigationKeys[0]].schemaLocation).toEqual("");
        expect(navigation[0][navigationKeys[0]].items).toEqual([
            navigationKeys[1],
            navigationKeys[2],
        ]);
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[0][navigationKeys[1]].schemaLocation).toEqual(
            "reactProperties.children"
        );
        expect(navigation[0][navigationKeys[1]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[1]].relativeDataLocation).toEqual(null);
        expect(navigation[0][navigationKeys[2]].schemaLocation).toEqual(
            "reactProperties.otherChildren"
        );
        expect(navigation[0][navigationKeys[2]].parent).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[2]].relativeDataLocation).toEqual(null);
        expect(navigation[1]).toEqual([navigationKeys[2], navigationKeys[1]]);
        expect(navigation[2]).toEqual(["children"]);
        expect(navigation[3]).toEqual(navigationKeys[0]);
    });
});

/**
 * Gets the navigation from a schema
 */
describe("getNavigationFromComponentSchema", () => {
    test("should return an empty object", () => {
        expect(getNavigationFromComponentSchema({ type: "string" })[0]).toEqual({});
    });
    test("should return children locations", () => {
        const navigation: ComponentSchemaNavigation = getNavigationFromComponentSchema({
            id: "a",
            type: "object",
            reactProperties: {
                children: {
                    type: "children",
                },
                otherChildren: {
                    type: "children",
                },
            },
        });
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(2);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.children
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual(null);
        expect(navigation[0][navigationKeys[0]].schemaLocation).toEqual(
            "reactProperties.children"
        );
        expect(navigation[0][navigationKeys[1]].self).toEqual(navigationKeys[1]);
        expect(navigation[0][navigationKeys[1]].type).toEqual(
            NavigationDataType.children
        );
        expect(navigation[0][navigationKeys[1]].relativeDataLocation).toEqual(null);
        expect(navigation[0][navigationKeys[1]].schemaLocation).toEqual(
            "reactProperties.otherChildren"
        );
        expect(navigation[1]).toEqual([navigationKeys[1], navigationKeys[0]]);
    });
    test("should return array locations", () => {
        const navigation: ComponentSchemaNavigation = getNavigationFromComponentSchema({
            id: "a",
            type: "object",
            properties: {
                array: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
        });
        const navigationKeys: string[] = Object.keys(navigation[0]);
        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].type).toEqual(NavigationDataType.array);
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual(null);
        expect(navigation[0][navigationKeys[0]].schemaLocation).toEqual(
            "properties.array"
        );
        expect(navigation[1]).toEqual([]);
    });
    test("should return object locations", () => {
        const navigation: ComponentSchemaNavigation = getNavigationFromComponentSchema({
            id: "a",
            type: "object",
            properties: {
                object: {
                    type: "object",
                },
            },
        });
        const navigationKeys: string[] = Object.keys(navigation[0]);
        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].type).toEqual(NavigationDataType.object);
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual(null);
        expect(navigation[0][navigationKeys[0]].schemaLocation).toEqual(
            "properties.object"
        );
        expect(navigation[1]).toEqual([]);
    });
});

/**
 * Gets the navigation from data
 */
describe("getNavigationFromComponentData", () => {
    test("should return an single object if no data is passed", () => {
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            {},
            {}
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(undefined);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual([]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
    test("should return a single property if a data blob with a single primitive item has been passed", () => {
        const children: ReactComponentProps = {
            children: "Foo",
        };
        const data: any = children;
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            data,
            childrenSchema
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(childrenSchema.title);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual(["children"]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
    test("should return a single property if a data blob with a multiple primitive items has been passed", () => {
        const children: ReactComponentProps = {
            children: ["Foo", "Bar"],
        };
        const data: any = children;
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            data,
            childrenSchema
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(childrenSchema.title);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual(["children[0]", "children[1]"]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
    test("should return a single property if a data blob with a sing component item has been passed", () => {
        const children: ReactComponentProps = {
            children: { id: "", props: {} },
        };
        const data: any = children;
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            data,
            childrenSchema
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(childrenSchema.title);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual(["children"]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
    test("should return a single property if a data blob with a multiple component items has been passed", () => {
        const children: ReactComponentProps = {
            children: [{ id: "", props: {} }, { id: "", props: {} }],
        };
        const data: any = children;
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            data,
            childrenSchema
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(childrenSchema.title);
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual(["children[0]", "children[1]"]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
    test("should return a single property if a data blob with a single component item has been passed", () => {
        const childrenComponent: ReactComponentProps = {};
        const data: any = childrenComponent;
        const navigation: ComponentDataNavigation = getNavigationFromComponentData(
            data,
            childOptions[0].schema
        );
        const navigationKeys: string[] = Object.keys(navigation[0]);

        expect(navigationKeys).toHaveLength(1);
        expect(navigation[0][navigationKeys[0]].self).toEqual(navigationKeys[0]);
        expect(navigation[0][navigationKeys[0]].text).toEqual(
            childOptions[0].schema.title
        );
        expect(navigation[0][navigationKeys[0]].type).toEqual(
            NavigationDataType.component
        );
        expect(navigation[0][navigationKeys[0]].relativeDataLocation).toEqual("");
        expect(navigation[1]).toEqual([]);
        expect(navigation[2]).toEqual(navigationKeys[0]);
    });
});

describe("getDragHoverState", () => {
    const currentState: TreeNavigation = {
        a: {
            self: "a",
            parent: "root",
            relativeDataLocation: "children[0]",
            schemaLocation: "",
            text: "A",
            type: NavigationDataType.component,
            items: [],
        },
        b: {
            self: "b",
            parent: "root",
            relativeDataLocation: "children[1]",
            schemaLocation: null,
            text: "B",
            type: NavigationDataType.component,
            items: ["bChildren"],
        },
        c: {
            self: "c",
            parent: "root",
            relativeDataLocation: "children[2]",
            schemaLocation: null,
            text: "C",
            type: NavigationDataType.component,
            items: [],
        },
        bChildren: {
            self: "bChildren",
            parent: "b children",
            relativeDataLocation: "",
            schemaLocation: "reactProperties.children",
            text: "Children",
            type: NavigationDataType.children,
            items: [],
        },
        root: {
            self: "root",
            relativeDataLocation: "",
            schemaLocation: "",
            text: "Root",
            type: NavigationDataType.component,
            items: ["a", "b", "c"],
        },
    };

    test("should place the item inserted into the component", () => {
        const updatedState: Partial<NavigationState> = getDragHoverState(
            currentState,
            "b", // target
            "a", // source
            TargetPosition.insert
        );

        expect(updatedState.navigation.root.items).toEqual(["b", "c"]);
        expect(updatedState.navigation.a.parent).toEqual("bChildren");
        expect(updatedState.navigation.bChildren.items).toEqual(["a"]);
    });
    test("should place the item after the component", () => {
        const updatedState: Partial<NavigationState> = getDragHoverState(
            currentState,
            "a", // target
            "b", // source
            TargetPosition.append
        );

        expect(updatedState.navigation.root.items).toEqual(["a", "c", "b"]);
        expect(updatedState.navigation.a.parent).toEqual("root");
    });
    test("should place the item before the component", () => {
        const updatedState: Partial<NavigationState> = getDragHoverState(
            currentState,
            "c", // target
            "b", // source
            TargetPosition.prepend
        );

        expect(updatedState.navigation.root.items).toEqual(["a", "c", "b"]);
        expect(updatedState.navigation.a.parent).toEqual("root");
    });
});

describe("getDragEndUpdatedData", () => {
    test("should add data into an array", () => {
        console.log("begin");
    });
    // test("should add data into an undefined location", () => {

    // });
    // test("should add data into an object", () => {

    // });
    // test("should add data above an item in an array", () => {

    // });
    // test("should add data below an item in an array", () => {

    // });
});
