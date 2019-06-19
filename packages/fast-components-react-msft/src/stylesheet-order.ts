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
export const typography: number = index.next().value;
export const badge: number = index.next().value;
export const caption: number = index.next().value;
export const label: number = index.next().value;
export const heading: number = index.next().value;
export const metatext: number = index.next().value;
export const paragraph: number = index.next().value;
export const subheading: number = index.next().value;

/**
 * Misc
 */
export const breadcrumb: number = index.next().value;
export const image: number = index.next().value;
export const divider: number = index.next().value;

/**
 * Buttons
 */
export const accentButton: number = index.next().value;
export const justifiedButton: number = index.next().value;
export const lightweightButton: number = index.next().value;
export const neutralButton: number = index.next().value;
export const outlineButton: number = index.next().value;
export const stealthButton: number = index.next().value;
export const button: number = index.next().value;
export const hypertext: number = index.next().value;
export const flipper: number = index.next().value;
export const callToAction: number = index.next().value;
export const actionToggle: number = index.next().value;
export const actionTrigger: number = index.next().value;

/**
 * Form fields
 */
export const toggle: number = index.next().value;
export const numberField: number = index.next().value;
export const checkbox: number = index.next().value;
export const radio: number = index.next().value;
export const textArea: number = index.next().value;
export const textField: number = index.next().value;
export const progress: number = index.next().value;
export const select: number = index.next().value;
export const selectOption: number = index.next().value;
export const sliderLabel: number = index.next().value;
export const slider: number = index.next().value;
export const autoSuggestOption: number = index.next().value;
export const autoSuggest: number = index.next().value;
export const textAction: number = index.next().value;

/**
 * Flyout components
 */
export const contextMenuItem: number = index.next().value;
export const contextMenu: number = index.next().value;

/**
 * Container components
 */
export const background: number = index.next().value;
export const pivot: number = index.next().value;
export const card: number = index.next().value;
export const carousel: number = index.next().value;
export const dialog: number = index.next().value;
