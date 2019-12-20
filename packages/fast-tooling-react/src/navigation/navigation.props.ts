import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { ChildOptionItem } from "../data-utilities";
import { NavigationClassNameContract } from "./navigation.style";
import {
    ReactComponentProps,
    TreeNavigationConfig,
} from "../message-system/navigation.utilities";
import { TreeNavigation } from "../message-system/navigation.props";

export interface NavigationState {
    /**
     * The navigation data
     */
    navigation: TreeNavigation;

    /**
     * A copy of the prop data
     * used so that source data can be removed
     * when drag starts and added when drag ends
     */
    data: ReactComponentProps;

    expandedNavigationIds: string[];

    /**
     * The root items id
     */
    rootNavigationItemId: string;

    /**
     * The data currently being moved
     */
    relocatingData: any;

    /**
     * The active navigation item id
     */
    activeNavigationItemId: string;

    /**
     * The dragging navigation id
     */
    draggingNavigationId: null | string;

    /**
     * The dragging items source data location
     */
    draggingSourceDataLocation: null | string;

    /**
     * The hovered tree item
     */
    dragHoverNavigationId: null | string;

    /**
     * The hovered location before
     */
    dragHoverBeforeNavigationId: null | string;

    /**
     * The hovered location after
     */
    dragHoverAfterNavigationId: null | string;

    /**
     * The hovered location center
     */
    dragHoverCenterNavigationId: null | string;
}

export interface NavigationHandledProps
    extends ManagedClasses<NavigationClassNameContract> {
    /**
     * The JSON schema
     */
    schema: any;

    /**
     * The message system
     * used for sending and recieving data
     */
    messageSystem: void | Worker;

    /**
     * The navigation data
     */
    navigation: TreeNavigationConfig;

    /**
     * The React child options
     */
    childOptions?: ChildOptionItem[];

    /**
     * The data location if the component is controlled
     */
    dataLocation?: string;

    /**
     * The location update
     */
    onLocationUpdate?: (dataLocation: string) => void;

    /**
     * If navigation items should enable drag to re-order. For this to work,
     * the parent application will need to ensure the Navigation component is
     * wrapped with a react-dnd backend. For more information on react-dnd backends,
     * see http://react-dnd.github.io/react-dnd/docs/overview
     */
    dragAndDropReordering?: boolean;

    /**
     * The onChange callback for updating the data
     */
    onChange?: (data: any, dataLocation?: string) => void;
}

export type NavigationProps = NavigationHandledProps;
