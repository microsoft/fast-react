import NavigationMessageSystemPlugin, {
    NavigationMessageSystemPluginProps,
} from "./plugin.navigation";
import { ChildOptionItem } from "../data-utilities";

export interface ReactChildrenNavigationMessageSystemPluginProps
    extends NavigationMessageSystemPluginProps {
    childOptions: ChildOptionItem[];
}

export class ReactChildrenNavigationMessageSystemPlugin extends NavigationMessageSystemPlugin<
    NavigationMessageSystemPluginProps
> {
    constructor(props: ReactChildrenNavigationMessageSystemPluginProps) {
        super(props);
    }
}
