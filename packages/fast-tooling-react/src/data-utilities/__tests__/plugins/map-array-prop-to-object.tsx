import { MapDataToComponentPlugin, MapDataToComponentPluginProps } from "../../";

export default class MapArrayPropToObject extends MapDataToComponentPlugin<
    MapDataToComponentPluginProps
> {
    public resolver(data: string[]): any {
        const arrayToObject: any = {};

        data.forEach(
            (arrayItem: string, index: number): void => {
                arrayToObject[arrayItem] = index;
            }
        );

        return arrayToObject;
    }
}
