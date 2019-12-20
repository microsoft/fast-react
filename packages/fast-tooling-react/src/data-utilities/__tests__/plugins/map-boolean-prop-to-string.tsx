import { MapDataToComponentPlugin, MapDataToComponentPluginProps } from "../../";

export default class MapBooleanPropToString extends MapDataToComponentPlugin<
    MapDataToComponentPluginProps
> {
    public resolver(data: boolean): string {
        return data.toString();
    }
}
