import React from "react";
import { Label, Toggle } from "@microsoft/fast-components-react-msft";
import { selectorStyle } from "../style";
import { Theme, ThemeSelectorProps } from "./theme-selector.props";

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
    id,
    theme,
    onUpdateTheme,
}: React.PropsWithChildren<ThemeSelectorProps>): React.ReactElement => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Label htmlFor={id} style={selectorStyle}>
                Dark mode
            </Label>
            <Toggle
                inputId={id}
                onClick={onUpdateTheme}
                selectedMessage={""}
                unselectedMessage={""}
                statusMessageId={"theme"}
                selected={theme === Theme.dark}
            />
        </div>
    );
};

export * from "./theme-selector.props";
