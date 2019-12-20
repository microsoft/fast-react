import React from "react";
import {
    MapDataToComponentPlugin,
    MapDataToComponentPluginProps,
} from "./mapping.data-to-component.plugin";
import { ChildOptionItem } from "./types";
import { mapDataToComponent } from "./mapping";

export interface MapDataToComponentReactChildrenPluginProps
    extends MapDataToComponentPluginProps {
    childOptions: ChildOptionItem[];
}

export class MapDataToComponentReactChildrenPlugin extends MapDataToComponentPlugin<
    MapDataToComponentReactChildrenPluginProps
> {
    public resolver(data: any, dataLocation: string): React.ReactNode {
        if (Array.isArray(data)) {
            return data.map((childItem: any) => {
                return this.resolveChildItem(childItem, dataLocation);
            });
        }

        return this.resolveChildItem(data, dataLocation);
    }

    private resolveChildItem(data: any, dataLocation: string): React.ReactNode {
        if (typeof data === "string") {
            return data;
        } else if (typeof data === "object") {
            const childComponent: ChildOptionItem = this.config.childOptions.find(
                (childOption: ChildOptionItem) => {
                    return childOption.schema.id === data.id;
                }
            );

            if (childComponent) {
                return mapDataToComponent(
                    childComponent.schema,
                    data.props,
                    childComponent.component,
                    this.plugins
                );
            }
        }

        return null;
    }
}
