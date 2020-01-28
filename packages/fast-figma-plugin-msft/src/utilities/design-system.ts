import {
    DesignSystem,
    DesignSystemDefaults,
} from "@microsoft/fast-components-styles-msft";
import { getPluginData, supports } from "../plugin-data";
import { isSceneNode } from "../utilities/node";
import { getRecipeNames, getRecipeValue } from "../color-recipies";
import designSystemDefaults from "@microsoft/fast-components-styles-msft/dist/design-system";

/**
 * Determine the contextual design system merging all upstream design systems
 *
 * TODO: convert this to a more abstract tree walker to aggregate design-system values as requested to avoid processing we don't need to do.
 * Default resolution would be to get the nearest node's value - supply a fn to do something more custom (for backgroundColor maybe? Might be able to just use closest background color)
 */
export async function getDesignSystem(node: BaseNode): Promise<DesignSystem> {
    let parent = node.parent;
    const fills: string[] = [];
    const validFills: string[] = await getRecipeNames("backgroundFill");
    let luminance: number | null = null;

    if (supports(node, "luminance")) {
        const lum: number = getPluginData(node, "luminance");

        if (lum !== -1) {
            luminance = lum;
        }
    }

    while (parent !== null && isSceneNode(parent)) {
        if (supports(parent, "backgroundFill")) {
            const fillRecipe = getPluginData(parent, "backgroundFill");

            if (validFills.includes(fillRecipe)) {
                fills.push(fillRecipe);
            }
        }

        if (luminance === null && supports(parent, "luminance")) {
            const lum: number = getPluginData(parent, "luminance");

            if (lum !== -1) {
                luminance = lum;
            }
        }

        parent = parent.parent;
    }

    const reversedFills = fills.reverse();
    // TODO: https://github.com/microsoft/fast-dna/issues/2589
    let backgroundColor: string = DesignSystemDefaults.backgroundColor;

    for (const name of reversedFills) {
        backgroundColor = await getRecipeValue("backgroundFill", name, {
            ...DesignSystemDefaults,
            backgroundColor,
        });
    }

    return {
        ...DesignSystemDefaults,
        backgroundColor,
        baseLayerLuminance: luminance === null ? 1 : luminance,
    } as DesignSystem;
}
