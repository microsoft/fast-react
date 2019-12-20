import reactChildSchema from "./react-child.schema";
import { pluginIdKeyword } from "./types";

const defaultReactChildrenPluginId: string =
    "@microsoft/fast-tooling-react/default-react-children";

export default {
    [pluginIdKeyword]: defaultReactChildrenPluginId,
    oneOf: [
        ...reactChildSchema.oneOf,
        {
            type: "array",
            items: reactChildSchema,
        },
    ],
};

export { defaultReactChildrenPluginId };
