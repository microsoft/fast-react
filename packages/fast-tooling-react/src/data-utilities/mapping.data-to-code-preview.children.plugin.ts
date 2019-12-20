import { MapDataToCodePreview } from "./mapping.data-to-code-preview.plugin";
import { MapDataToComponentPluginProps } from "./mapping.data-to-component.plugin";
import { ChildOptionItem } from "./types";
import { mapDataToCodePreview } from "./mapping";
import { AttributeRender, AttributeType } from "./mapping.props";

export interface MapDataToCodePreviewReactChildrenPluginProps
    extends MapDataToComponentPluginProps {
    childOptions: ChildOptionItem[];
}

export class MapDataToCodePreviewReactChildrenPlugin extends MapDataToCodePreview<
    MapDataToCodePreviewReactChildrenPluginProps
> {
    private childOptions: ChildOptionItem[];

    constructor(props: MapDataToCodePreviewReactChildrenPluginProps) {
        super(props);

        this.childOptions = props.childOptions;
    }

    public resolver(data: any, tabIndent: number, dataLocation: string): AttributeRender {
        let render: string = "";

        if (Array.isArray(data)) {
            render = data.reduce((accum: string, childItem: any) => {
                return `${accum}${this.resolveChild(childItem, tabIndent)}\n`;
            }, "");
        } else {
            render = `${this.resolveChild(data, tabIndent)}\n`;
        }

        return {
            id: dataLocation,
            render,
            type: AttributeType.nested,
        };
    }

    public resolveChild(data: any, tabIndent: number): string {
        if (typeof data === "string") {
            return `${this.getTabIndent(tabIndent)}${data}`;
        }

        return this.resolveComponentChild(data, tabIndent);
    }

    public resolveComponentChild(data: any, tabIndent: number): string {
        const childOption: ChildOptionItem = this.childOptions.find(
            (childOptionItem: ChildOptionItem) => {
                return childOptionItem.schema.id === data.id;
            }
        );

        return mapDataToCodePreview({
            data: data.props,
            schema: childOption.schema,
            componentName: childOption.name,
            tabIndent,
        });
    }
}
