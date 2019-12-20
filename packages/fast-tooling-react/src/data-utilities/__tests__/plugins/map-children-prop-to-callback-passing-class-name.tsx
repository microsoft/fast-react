import React from "react";
import { MapDataToComponentPlugin, MapDataToComponentPluginProps } from "../../";
import { ChildOptionItem, mapDataToComponent } from "../../";

export interface MapChildrenPropToCallbackPassingClassNameProps
    extends MapDataToComponentPluginProps {
    childOptions: ChildOptionItem[];
}

export default class MapChildrenPropToCallbackPassingClassName extends MapDataToComponentPlugin<
    MapChildrenPropToCallbackPassingClassNameProps
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
                return (className: string): React.ReactNode => {
                    return mapDataToComponent(
                        childComponent.schema,
                        { ...data.props, className },
                        childComponent.component,
                        this.plugins
                    );
                };
            }
        }

        return null;
    }
}
