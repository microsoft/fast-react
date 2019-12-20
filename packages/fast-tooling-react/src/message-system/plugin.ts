export enum MessageSystemPluginType {
    data = "data",
    navigation = "navigation",
}

export interface MessageSystemPluginProps {
    /**
     * The string(s) used to identify the plugin instance,
     * Identified in the JSON schema with the `messageSystemPluginId` property
     */
    id: string | string[];

    /**
     * The type of message system plugin
     */
    type: MessageSystemPluginType;
}

export default abstract class MessageSystemPlugin<C extends MessageSystemPluginProps> {
    private config: C;

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
}
