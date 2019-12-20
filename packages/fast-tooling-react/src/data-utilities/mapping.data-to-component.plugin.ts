export interface MapDataToComponentPluginProps {
    /**
     * The string(s) used to identify the plugin instance,
     *
     * Typically used in conjunction with the `pluginId` property
     * in a JSON schema and identified in the `mapDataToComponent`
     * exported function.
     */
    id: string | string[];
}

export abstract class MapDataToComponentPlugin<C extends MapDataToComponentPluginProps> {
    public config: C;
    public plugins: Array<MapDataToComponentPlugin<MapDataToComponentPluginProps>>;

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
        plugins: Array<MapDataToComponentPlugin<MapDataToComponentPluginProps>>
    ): void {
        this.plugins = plugins;
    }

    /**
     * Resolves the data given
     */
    public abstract resolver(data: any, dataLocation?: string): any;
}
