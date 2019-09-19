import React from "react";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import styles, { AlignControlClassNameContract } from "./control.align.style";
import { AlignControlProps, AlignDirection } from "./control.align.props";
import { classNames } from "@microsoft/fast-web-utilities";

/**
 * Custom form control definition
 */
/* tslint:disable-next-line */
class AlignControl extends React.Component<
    AlignControlProps & ManagedClasses<AlignControlClassNameContract>,
    {}
> {
    public static displayName: string = "AlignControl";

    public static defaultProps: Partial<
        AlignControlProps & ManagedClasses<AlignControlClassNameContract>
    > = {
        managedClasses: {},
    };

    public render(): React.ReactNode {
        return (
            <div
                className={classNames(this.props.managedClasses.alignControl, [
                    this.props.managedClasses.alignControl__disabled,
                    this.props.disabled,
                ])}
            >
                {this.renderInput(AlignDirection.top, this.props.onChange)}
                {this.renderInput(AlignDirection.center, this.props.onChange)}
                {this.renderInput(AlignDirection.bottom, this.props.onChange)}
            </div>
        );
    }

    private isChecked(direction: string): boolean {
        return (
            this.props.value === direction ||
            (typeof this.props.value === "undefined" && this.props.default === direction)
        );
    }

    private renderInput(
        direction: AlignDirection,
        onChangeHandler: (value: any) => void
    ): React.ReactNode {
        if (this.props.options && Array.isArray(this.props.options)) {
            const option: string = this.props.options.find((item: string) => {
                return item === direction;
            });

            if (typeof option !== "undefined") {
                return (
                    <span>
                        <input
                            className={classNames(
                                this.props.managedClasses.alignControl_input,
                                [
                                    this.props.managedClasses.alignControl_input__bottom,
                                    direction === AlignDirection.bottom,
                                ],
                                [
                                    this.props.managedClasses.alignControl_input__center,
                                    direction === AlignDirection.center,
                                ],
                                [
                                    this.props.managedClasses.alignControl_input__top,
                                    direction === AlignDirection.top,
                                ]
                            )}
                            id={this.props.dataLocation}
                            type={"radio"}
                            value={direction}
                            name={this.props.dataLocation}
                            aria-label={`${direction} align`}
                            onChange={onChangeHandler.bind(this, direction)}
                            checked={this.isChecked(direction)}
                            disabled={this.props.disabled}
                        />
                    </span>
                );
            }
        }
    }
}

export { AlignControl };
export default manageJss(styles)(AlignControl);
