import React from "react";
import { ContextMenuItemRole } from "@microsoft/fast-components-react-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import { ContextMenuItemClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import ContextMenuItemStyles from "@microsoft/fast-components-styles-msft/css/context-menu-item.css";
import {
    contextMenuDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import contextMenuItemSchema from "./context-menu-item.schema";
import contextMenuItemSchema2 from "./context-menu-item.schema.2";
import MSFTContextMenuItem, {
    ContextMenuItemManagedClasses,
    ContextMenuItemUnhandledProps,
    ContextMenuItemHandledProps as MSFTContextMenuItemHandledProps,
    ContextMenuItemProps as MSFTContextMenuItemProps,
} from "./context-menu-item";

const ContextMenuItem = manageJss()(
    withCSSCustomProperties(...contextMenuDependencies)(
        MergeManagedClasses(MSFTContextMenuItem, ContextMenuItemStyles)
    )
);
type ContextMenuItem = InstanceType<typeof ContextMenuItem>;

type ContextMenuItemHandledProps = Subtract<
    MSFTContextMenuItemHandledProps,
    ContextMenuItemManagedClasses
>;
type ContextMenuItemProps = ManagedJSSProps<
    MSFTContextMenuItemProps,
    ContextMenuItemClassNameContract,
    DesignSystem
>;

export {
    ContextMenuItem,
    ContextMenuItemRole,
    ContextMenuItemProps,
    ContextMenuItemClassNameContract,
    ContextMenuItemHandledProps,
    contextMenuItemSchema,
    contextMenuItemSchema2,
    ContextMenuItemUnhandledProps,
};
