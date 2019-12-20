import "jest";
import { getDragHoverState } from "./navigation.utilities";
import { NavigationState } from "./navigation.props";
import { NavigationDataType, TreeNavigation } from "../message-system/navigation.props";
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
            schemaLocation: "properties.children",
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
