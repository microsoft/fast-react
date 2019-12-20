import { BreadcrumbItemEventHandler } from "../form.props";
import { TreeNavigation } from "../../message-system/navigation.props";

export interface BreadcrumbItem {
    href: string;
    text: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export type HandleBreadcrumbClick = (
    schemaLocation: string,
    dataLocation: string,
    schema: any
) => BreadcrumbItemEventHandler;

/**
 * Gets breadcrumbs from navigation items
 */
export function getBreadcrumbs(
    navigation: TreeNavigation,
    handleClick: HandleBreadcrumbClick
): BreadcrumbItem[] {
    // return navigation.map(
    //     (navigationItem: NavigationItem): BreadcrumbItem => {
    //         return {
    //             href: navigationItem.dataLocation,
    //             text: navigationItem.title,
    //             onClick: handleClick(
    //                 navigationItem.schemaLocation,
    //                 navigationItem.dataLocation,
    //                 navigationItem.schema
    //             ),
    //         };
    //     }
    // );
    return [];
}
