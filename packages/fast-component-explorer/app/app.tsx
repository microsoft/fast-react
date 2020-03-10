import React from "react";
import {
    AccentButton,
    AccentButtonClassNameContract,
    CallToAction,
    CallToActionAppearance,
    CallToActionProps,
    Carousel,
    CarouselSlide,
    CarouselSlideTheme,
    Heading,
    HeadingProps,
    HeadingSize,
    HeadingTag,
    Image,
    ImageProps,
    Paragraph,
    ParagraphProps,
    ParagraphSize,
    Pivot,
} from "@microsoft/fast-components-react-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import { uniqueId } from "lodash-es";

interface CarouselHeroProps {
    heading?: HeadingProps;
    paragraph?: ParagraphProps;
    callToAction?: CallToActionProps;
    image?: ImageProps;
    className?: string;
    theme?: CarouselSlideTheme;
    extraButtons?: boolean;
}

/**
 * A stand-in a mock hero
 */
class CarouselHero extends React.Component<CarouselHeroProps, {}> {
    public static defaultProps: CarouselHeroProps = {
        heading: {
            tag: HeadingTag.h1,
            children: "Heading text",
        },
        paragraph: {
            children: "Hero paragraph test text",
        },
        image: {
            alt: "Placeholder image",
        },
        callToAction: {
            children: "Call to action",
            href: "#",
            appearance: CallToActionAppearance.primary,
        },
        extraButtons: false,
    };

    private imageSrc: string =
        this.props.theme === CarouselSlideTheme.light
            ? "http://placehold.it/1399x600/2F2F2F/171717"
            : "http://placehold.it/1399x600/";

    private extraButtonRightStyle: ComponentStyles<
        AccentButtonClassNameContract,
        DesignSystem
    > = {
        button: {
            float: "right",
        },
    };

    private containerBackgroundColor: string =
        this.props.theme === CarouselSlideTheme.light
            ? "rgb(47,47,47)"
            : "rgb(204,204,204)";

    public render(): React.ReactNode {
        return (
            <div
                className={this.props.className}
                style={{ backgroundColor: this.containerBackgroundColor }}
            >
                <div
                    style={{
                        justifyContent: "center",
                        width: "100%",
                        position: "absolute",
                        top: "0",
                        height: "100%",
                        alignItems: "flex-end",
                        display: "flex",
                        left: "0",
                        right: "0",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            marginBottom: "40px",
                            padding: "16px",
                            background: "hsla(0,0%,100%,.9)",
                            width: "40%",
                            textAlign: "center",
                        }}
                    >
                        <Heading
                            tag={this.props.heading!.tag}
                            size={this.props.heading!.size}
                            children={this.props.heading!.children}
                        />
                        <Paragraph
                            size={this.props.paragraph!.size}
                            children={this.props.paragraph!.children}
                        />
                        <CallToAction
                            style={{ marginTop: "16px" }}
                            appearance={this.props.callToAction!.appearance}
                            children={this.props.callToAction!.children}
                            href={this.props.callToAction!.href}
                        />
                    </div>
                </div>
                <Image src={this.imageSrc} alt={this.props.image!.alt as any} />
                {this.props.extraButtons && (
                    <React.Fragment>
                        <AccentButton jssStyleSheet={this.extraButtonRightStyle}>
                            Right Test
                        </AccentButton>
                        <AccentButton>Left Test</AccentButton>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function itemsFiller(
    itemCount: number,
    headerContent?: string,
    paragraphContent?: string,
    extraButtons?: boolean
): CarouselSlide[] {
    const fillerArray: CarouselSlide[] = [];
    for (let i: number = 0, x: number = 1; i < itemCount; i++, x *= -1) {
        const theme: CarouselSlideTheme =
            x > 0 ? CarouselSlideTheme.light : CarouselSlideTheme.dark;
        fillerArray.push({
            id: `slide${i}`,
            theme,
            content: (className?: string): React.ReactNode => (
                <CarouselHero
                    className={className}
                    heading={
                        headerContent
                            ? {
                                  size: HeadingSize._5,
                                  children: headerContent,
                              }
                            : { children: `Slide ${i + 1}` }
                    }
                    paragraph={
                        paragraphContent
                            ? {
                                  children: paragraphContent,
                                  size: ParagraphSize._3,
                              }
                            : undefined
                    }
                    theme={theme}
                    extraButtons={extraButtons}
                />
            ),
        });
    }
    return fillerArray;
}

/**
 * The root level app
 *
 * This is where the routes are declared
 */
/* tslint:disable:max-classes-per-file */
export default class App extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Carousel
                    label="A carousel of items"
                    autoplay={true}
                    items={itemsFiller(5)}
                />
            </React.Fragment>
        );
    }
}
