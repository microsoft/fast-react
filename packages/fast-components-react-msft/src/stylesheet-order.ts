// Calculates the JSS sheet index. The higher the input value
// the lower the resulting sheet priority. 0 is intended to be the
// most important sheet index, where all other numbers have less priority.
function calculateIndex(i: number): number {
    return -1000000 - Math.abs(i);
}

/**
 * Typography
 */
export const typographySheetIndex: number = calculateIndex(41);
export const badgeSheetIndex: number = calculateIndex(40);
export const captionSheetIndex: number = calculateIndex(39);
export const labelSheetIndex: number = calculateIndex(38);
export const headingSheetIndex: number = calculateIndex(37);
export const metatextSheetIndex: number = calculateIndex(36);
export const paragraphSheetIndex: number = calculateIndex(35);
export const subheadingSheetIndex: number = calculateIndex(34);

/**
 * Misc
 */
export const breadcrumbSheetIndex: number = calculateIndex(33);
export const imageSheetIndex: number = calculateIndex(32);
export const dividerSheetIndex: number = calculateIndex(31);

/**
 * Buttons
 */
export const accentButtonSheetIndex: number = calculateIndex(30);
export const lightweightButtonSheetIndex: number = calculateIndex(29);
export const neutralButtonSheetIndex: number = calculateIndex(28);
export const outlineButtonSheetIndex: number = calculateIndex(27);
export const stealthButtonSheetIndex: number = calculateIndex(26);
export const buttonSheetIndex: number = calculateIndex(25);
export const hypertextSheetIndex: number = calculateIndex(24);
export const flipperSheetIndex: number = calculateIndex(23);
export const callToActionSheetIndex: number = calculateIndex(21);
export const actionToggleSheetIndex: number = calculateIndex(21);
export const actionTriggerSheetIndex: number = calculateIndex(20);

/**
 * Form fields
 */
export const toggleSheetIndex: number = calculateIndex(19);
export const numberFieldSheetIndex: number = calculateIndex(18);
export const checkboxSheetIndex: number = calculateIndex(17);
export const radioSheetIndex: number = calculateIndex(16);
export const textAreaSheetIndex: number = calculateIndex(15);
export const textFieldSheetIndex: number = calculateIndex(14);
export const progressSheetIndex: number = calculateIndex(13);
export const selectSheetIndex: number = calculateIndex(12);
export const selectOptionSheetIndex: number = calculateIndex(11);
export const sliderLabelSheetIndex: number = calculateIndex(10);
export const sliderSheetIndex: number = calculateIndex(9);
export const autoSuggestOptionSheetIndex: number = calculateIndex(8);
export const autoSuggestSheetIndex: number = calculateIndex(7);
export const textActionSheetIndex: number = calculateIndex(6);

/**
 * Flyout components
 */
export const contextMenuItemSheetIndex: number = calculateIndex(5);
export const contextMenuSheetIndex: number = calculateIndex(4);

/**
 * Container components
 */
export const pivotSheetIndex: number = calculateIndex(3);
export const cardSheetIndex: number = calculateIndex(2);
export const carouselSheetIndex: number = calculateIndex(1);
export const dialogSheetIndex: number = calculateIndex(0);
