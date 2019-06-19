function* indexGenerator(i: number): IterableIterator<number> {
    let _index: number = i;

    while (typeof _index === "number") {
        yield _index++;
    }
}

const index: IterableIterator<number> = indexGenerator(-100000);

/**
 * Typography
 */
export const typographySheetIndex: number = index.next().value;
export const badgeSheetIndex: number = index.next().value;
export const captionSheetIndex: number = index.next().value;
export const labelSheetIndex: number = index.next().value;
export const headingSheetIndex: number = index.next().value;
export const metatextSheetIndex: number = index.next().value;
export const paragraphSheetIndex: number = index.next().value;
export const subheadingSheetIndex: number = index.next().value;

/**
 * Misc
 */
export const breadcrumbSheetIndex: number = index.next().value;
export const imageSheetIndex: number = index.next().value;
export const dividerSheetIndex: number = index.next().value;

/**
 * Buttons
 */
export const accentButtonSheetIndex: number = index.next().value;
export const justifiedButtonSheetIndex: number = index.next().value;
export const lightweightButtonSheetIndex: number = index.next().value;
export const neutralButtonSheetIndex: number = index.next().value;
export const outlineButtonSheetIndex: number = index.next().value;
export const stealthButtonSheetIndex: number = index.next().value;
export const buttonSheetIndex: number = index.next().value;
export const hypertextSheetIndex: number = index.next().value;
export const flipperSheetIndex: number = index.next().value;
export const callToActionSheetIndex: number = index.next().value;
export const actionToggleSheetIndex: number = index.next().value;
export const actionTriggerSheetIndex: number = index.next().value;

/**
 * Form fields
 */
export const toggleSheetIndex: number = index.next().value;
export const numberFieldSheetIndex: number = index.next().value;
export const checkboxSheetIndex: number = index.next().value;
export const radioSheetIndex: number = index.next().value;
export const textAreaSheetIndex: number = index.next().value;
export const textFieldSheetIndex: number = index.next().value;
export const progressSheetIndex: number = index.next().value;
export const selectSheetIndex: number = index.next().value;
export const selectOptionSheetIndex: number = index.next().value;
export const sliderLabelSheetIndex: number = index.next().value;
export const sliderSheetIndex: number = index.next().value;
export const autoSuggestOptionSheetIndex: number = index.next().value;
export const autoSuggestSheetIndex: number = index.next().value;
export const textActionSheetIndex: number = index.next().value;

/**
 * Flyout components
 */
export const contextMenuItemSheetIndex: number = index.next().value;
export const contextMenuSheetIndex: number = index.next().value;

/**
 * Container components
 */
export const pivotSheetIndex: number = index.next().value;
export const cardSheetIndex: number = index.next().value;
export const carouselSheetIndex: number = index.next().value;
export const dialogSheetIndex: number = index.next().value;
