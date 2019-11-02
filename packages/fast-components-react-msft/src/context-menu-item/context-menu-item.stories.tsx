import { storiesOf } from "@storybook/react";
import React from "react";
import { Divider } from "../divider";
import { ContextMenuItem } from "./";
import { glyphFactory, SVGGlyph } from "../../assets/svg-element";
import { ActionTrigger, ActionTriggerAppearance } from "../action-trigger";
import { EdgeIcon } from "@edge-web-ui/edge-icons";

function glyphExample(glyph: JSX.Element): (className?: string) => React.ReactNode {
    return (className?: string): React.ReactNode => {
        return React.cloneElement(glyph, { className });
    };
}

storiesOf("Context menu item", module)
    .add("Default", () => <ContextMenuItem>Default menu item</ContextMenuItem>)
    .add("With glyph", () => (
        <ContextMenuItem before={glyphFactory(SVGGlyph.download)()}>
            Menu item with glyph
        </ContextMenuItem>
    ))
    .add("Disabled", () => (
        <ContextMenuItem disabled={true}>Disabled menu item</ContextMenuItem>
    ))
    .add("Icon", () => (
        <ContextMenuItem>
            <ActionTrigger
                appearance={ActionTriggerAppearance.stealth}
                glyph={glyphExample(<EdgeIcon />)}
            >
                Label here
            </ActionTrigger>
        </ContextMenuItem>
    ));
