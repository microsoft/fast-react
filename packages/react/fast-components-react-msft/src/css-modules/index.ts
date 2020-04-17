import React from "react";
import { DesignSystemResolver } from "@microsoft/fast-components-styles-msft";
import { mergeWith } from "lodash-es";

interface CustomPropertyResolver {
    name: string;
    resolver: DesignSystemResolver<string | number>;
}

interface CSSModuleProps<T> {
    managedClasses: Partial<T>;
    customPropertyResolvers: CustomPropertyResolver[];
}

function WithCustomPropertyResolvers(definitions: CustomPropertyResolver[]) {
    return (component: React.Component | React.FunctionComponent) => {};
}

function mergeManagedClasses<T extends {}>(objValue: T, srcValue: T): string {
    if (srcValue && objValue) {
        return `${srcValue} ${objValue}`;
    }
}

export function MergeManagedClasses<T, Y extends { managedClasses?: T }>(
    component: React.FunctionComponent<Y> | React.ComponentClass<Y>,
    classes: T
): React.FunctionComponent<Y> {
    return (props: Y): React.ReactElement => {
        const { managedClasses, ...rest } = props;
        return React.createElement(component, {
            managedClasses: mergeWith(
                managedClasses,
                classes,
                mergeManagedClasses
            ) as any,
            ...rest,
        } as Y);
    };
}
