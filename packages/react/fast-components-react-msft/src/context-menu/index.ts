import React from "react";
import { ContextMenuClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    contextMenuDependencies,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import ContextMenuStyles from "@microsoft/fast-components-styles-msft/css/context-menu.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import contextMenuSchema from "./context-menu.schema";
import contextMenuSchema2 from "./context-menu.schema.2";
import MSFTContextMenu, {
    ContextMenuManagedClasses,
    ContextMenuUnhandledProps,
    ContextMenuHandledProps as MSFTContextMenuHandledProps,
    ContextMenuProps as MSFTContextMenuProps,
} from "./context-menu";

const ContextMenu = manageJss()(
    withCSSCustomProperties(...contextMenuDependencies)(
        MergeManagedClasses(MSFTContextMenu, ContextMenuStyles)
    )
);
type ContextMenu = InstanceType<typeof ContextMenu>;

type ContextMenuHandledProps = Subtract<
    MSFTContextMenuHandledProps,
    ContextMenuManagedClasses
>;
type ContextMenuProps = ManagedJSSProps<
    MSFTContextMenuProps,
    ContextMenuClassNameContract,
    DesignSystem
>;

export {
    ContextMenu,
    ContextMenuProps,
    ContextMenuClassNameContract,
    ContextMenuHandledProps,
    contextMenuSchema,
    contextMenuSchema2,
    ContextMenuUnhandledProps,
};
