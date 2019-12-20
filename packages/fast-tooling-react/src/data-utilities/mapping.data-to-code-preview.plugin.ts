import { AttributeRender } from "./mapping.props";

export interface MapDataToCodePreviewProps {
    /**
     * The string(s) used to identify the plugin instance,
     *
     * Typically used in conjunction with the `pluginId` property
     * in a JSON schema and identified in the `mapDataToComponent`
     * exported function.
     */
    id: string | string[];
}

export abstract class MapDataToCodePreview<C extends MapDataToCodePreviewProps> {
    public config: C;
    public plugins: Array<MapDataToCodePreview<MapDataToCodePreviewProps>>;

    private standardTabIndent: string = "    ";

    constructor(config: C) {
        this.config = config;

        this.config.id = Array.isArray(this.config.id)
            ? this.config.id
            : [this.config.id];
    }

    /**
     * Determines if there is a match for the IDs set for the plugin
     * and a provided ID
     */
    public matches(id: string): boolean {
        return this.config.id.indexOf(id) !== -1;
    }

    /**
     * Adds all plugins for reference
     */
    public updatePlugins(
        plugins: Array<MapDataToCodePreview<MapDataToCodePreviewProps>>
    ): void {
        this.plugins = plugins;
    }

    public getTabIndent(tabIndent: number): string {
        // Due to a strange behavioral quirk where a new array with empty values cannot
        // be interpreted by the reduce method unless the values are at least undefined,
        // two new arrays are created to create an array of undefined values.
        return new Array(...new Array(tabIndent)).reduce(
            (accumulation: string): string => {
                return `${accumulation}${this.standardTabIndent}`;
            },
            ""
        );
    }

    /**
     * Resolves the data given
     */
    public abstract resolver(
        data: any,
        tabIndent: number,
        dataLocation?: string
    ): AttributeRender;
}
