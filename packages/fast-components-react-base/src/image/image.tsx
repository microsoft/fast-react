import { ImageClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import { get } from "lodash-es";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import { ImageHandledProps, ImageProps, ImageUnhandledProps } from "./image.props";

export enum ImageSlot {
    source = "source",
}

// tslint:disable-next-line
const Image = React.forwardRef(
    (props: ImageProps, ref: any): JSX.Element => {
        const {
            className,
            managedClasses,
            alt,
            src,
            srcSet,
            sizes,
            children,
            ...unhandledProps
        }: ImageProps = props;

        return !children ? (
            <img
                {...unhandledProps}
                className={classNames(managedClasses.image, className)}
                alt={alt}
                src={src}
                sizes={sizes || null}
                srcSet={srcSet || null}
            />
        ) : (
            <picture
                {...unhandledProps}
                className={classNames(
                    managedClasses.image,
                    managedClasses.image__picture,
                    className
                )}
            >
                {children}
                <img src={src} alt={alt} className={managedClasses.image_img} />
            </picture>
        );
    }
);

Image.displayName = `${DisplayNamePrefix}Image`;
Image.defaultProps = {
    managedClasses: {},
};

export default Image;
export * from "./image.props";
export { ImageClassNameContract };
