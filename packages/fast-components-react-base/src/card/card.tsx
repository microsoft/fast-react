import { CardClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { CardHandledProps, CardProps, CardTag, CardUnhandledProps } from "./card.props";

// tslint:disable-next-line
const Card = React.forwardRef(
    (props: CardProps, ref: any): JSX.Element => {
        const { tag, className, managedClasses, ...unhandledProps }: CardProps = props;
        return React.createElement(CardTag[tag] || CardTag.div, {
            ...unhandledProps,
            className: classNames(managedClasses.card, className),
        });
    }
);
Card.displayName = `${DisplayNamePrefix}Card`;
Card.defaultProps = {
    managedClasses: {},
};

export default Card;
export * from "./card.props";
export { CardClassNameContract };
