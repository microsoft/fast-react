import React from "react";
import { TreeNavigation } from "./navigation.props";

interface NavigationTreeItemProps {
    children?: React.ReactNode;
    className: string;
    dataLocation: string;
    expanded: boolean;
    handleClick: React.MouseEventHandler<HTMLElement>;
    handleKeyUp: React.KeyboardEventHandler<HTMLElement>;
    level: number;
    linkClassName: string;
    navigationLength: number;
    positionInNavigation: number;
    text: string;
    triggerClassName: string;
}

export default function NavigationTreeItem(props: NavigationTreeItemProps): JSX.Element {
    const item: JSX.Element =
        props.children !== undefined ? (
            <div
                className={props.className}
                role={"treeitem"}
                aria-level={props.level}
                aria-setsize={props.navigationLength}
                aria-posinset={props.positionInNavigation}
                aria-expanded={props.expanded}
                onClick={props.handleClick}
                onKeyUp={props.handleKeyUp}
            >
                <span
                    className={props.triggerClassName}
                    onClick={props.handleClick}
                    onKeyUp={props.handleKeyUp}
                    tabIndex={0}
                    data-location={props.dataLocation}
                >
                    {props.text}
                </span>
                {props.children}
            </div>
        ) : (
            <div className={props.className} role={"none"}>
                <a
                    className={props.linkClassName}
                    role={"treeitem"}
                    data-location={props.dataLocation}
                    aria-level={props.level}
                    aria-setsize={props.navigationLength}
                    aria-posinset={props.positionInNavigation}
                    href={"#"}
                    onClick={props.handleClick}
                    onKeyUp={props.handleKeyUp}
                    tabIndex={0}
                >
                    {props.text}
                </a>
            </div>
        );

    return item;
}
