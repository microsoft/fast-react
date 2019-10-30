import { actionTriggerButtonOverrides } from "@microsoft/fast-components-styles-msft";
import { classNames } from "@microsoft/fast-web-utilities";
import { isNil } from "lodash-es";
import React from "react";
import { Button, ButtonAppearance } from "../button";
import { DisplayNamePrefix } from "../utilities";
import { ActionTriggerAppearance, ActionTriggerProps } from "./action-trigger.props";

/* tslint:disable:jsx-no-lambda */
// tslint:disable-next-line
const ActionTrigger = React.forwardRef(
    (props: ActionTriggerProps): JSX.Element => {
        const {
            appearance,
            className,
            glyph,
            children,
            managedClasses,
            disabled,
            ...unhandledProps
        }: ActionTriggerProps = props;

        return (
            <Button
                {...unhandledProps}
                className={classNames(
                    managedClasses.actionTrigger,
                    [managedClasses.actionTrigger__disabled, disabled],
                    managedClasses[`actionTrigger__${appearance}`],
                    [
                        managedClasses.actionTrigger__hasGlyphAndContent,
                        !isNil(glyph) && !isNil(children),
                    ],
                    className
                )}
                appearance={ButtonAppearance[ActionTriggerAppearance[appearance]]}
                disabled={disabled}
                beforeContent={(): React.ReactNode =>
                    glyph(managedClasses.actionTrigger_glyph)
                }
                jssStyleSheet={actionTriggerButtonOverrides}
            >
                {children}
            </Button>
        );
    }
);

ActionTrigger.displayName = `${DisplayNamePrefix}ActionTrigger`;
ActionTrigger.defaultProps = {
    managedClasses: {},
};

export default ActionTrigger;
export * from "./action-trigger.props";
/* tslint:enable:jsx-no-lambda */
