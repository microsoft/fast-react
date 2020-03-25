import { attr, FastElement } from "@microsoft/fast-element";
import { MenuItemRole } from "../menu-item";
import { inRange, invert } from "lodash-es";
import {
    isHTMLElement,
    keyCodeArrowDown,
    keyCodeArrowLeft,
    keyCodeArrowRight,
    keyCodeArrowUp,
    keyCodeEnd,
    keyCodeHome,
    keyCodeTab,
} from "@microsoft/fast-web-utilities";

export class Menu extends FastElement {
    public items: HTMLSlotElement;

    private menuItems: Element[];

    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    private focusIndex: number = -1;

    private static focusableElementRoles: { [key: string]: string } = invert(
        MenuItemRole
    );

    public connectedCallback(): void {
        super.connectedCallback();

        // store a reference to our children
        this.menuItems = this.domChildren();
        const focusIndex = this.menuItems.findIndex(this.isFocusableElement);

        // if our focus index is not -1 we have items
        if (focusIndex !== -1) {
            this.focusIndex = focusIndex;
        }

        for (let item: number = 0; item < this.menuItems.length; item++) {
            if (item === focusIndex) {
                this.menuItems[item].setAttribute("tabindex", "0");
            }

            this.menuItems[item].addEventListener("blur", this.handleMenuItemFocus);
        }
    }

    public handleMenuKeyDown(e: KeyboardEvent): boolean {
        console.log(e, "event prior to switch");
        switch (e.keyCode) {
            case keyCodeArrowDown:
            case keyCodeArrowRight:
                // if I'm a submenu, open me
                // if I'm not a submenu, go forward one index
                console.log("next item");
                break;
            case keyCodeArrowUp:
            case keyCodeArrowLeft:
                // if I'm a submenu, close me
                // if I'm not a submenu, go back one index
                console.log("previous item");
                break;
            case keyCodeEnd:
                // set focus on last item
                console.log("last item");
                break;
            case keyCodeHome:
                // set focus on first item
                console.log("first item");
                break;
        }

        return true;
    }

    private domChildren(): Element[] {
        return Array.from(this.children);
    }

    private isMenuItemElement = (el: Element): el is HTMLElement => {
        return (
            isHTMLElement(el) &&
            Menu.focusableElementRoles.hasOwnProperty(el.getAttribute("role") as string)
        );
    };

    private isDisabledElement = (el: Element): el is HTMLElement => {
        return this.isMenuItemElement(el) && el.getAttribute("aria-disabled") === "true";
    };

    private isFocusableElement = (el: Element): el is HTMLElement => {
        return this.isMenuItemElement(el) && !this.isDisabledElement(el);
    };

    private handleMenuItemFocus = (e: KeyboardEvent): void => {
        const target = e.currentTarget as Element;
        const focusIndex: number = this.menuItems.indexOf(target);

        if (this.isDisabledElement(target)) {
            target.blur();
            return;
        }

        if (focusIndex !== this.focusIndex && focusIndex !== -1) {
            this.setFocus(focusIndex, focusIndex > this.focusIndex ? 1 : -1);
        }
    };

    private setFocus(focusIndex: number, adjustment: number): void {
        const children: Element[] = this.menuItems;

        while (inRange(focusIndex, children.length)) {
            const child: Element = children[focusIndex];

            if (this.isFocusableElement(child)) {
                // update the tabindex of next focusable element
                child.setAttribute("tabindex", "0");

                // focus the element
                child.focus();

                // change the previous index to -1
                children[this.focusIndex].setAttribute("tabindex", "-1");

                // update the focus index
                this.focusIndex = focusIndex;

                break;
            }

            focusIndex += adjustment;
        }
    }
}
