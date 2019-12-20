import DataMessageSystemPlugin, { DataMessageSystemPluginProps } from "./plugin.data";
import { ChildOptionItem } from "../data-utilities";

export interface ReactChildrenDataMessageSystemPluginProps
    extends DataMessageSystemPluginProps {
    childOptions: ChildOptionItem[];
}

export class ReactChildrenDataMessageSystemPlugin extends DataMessageSystemPlugin<
    ReactChildrenDataMessageSystemPluginProps
> {
    constructor(props: ReactChildrenDataMessageSystemPluginProps) {
        super(props);
    }
}
