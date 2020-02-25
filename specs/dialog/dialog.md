# Dialog

## Overview

Dialog (aka Modal) as defined by W3C:
> A dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

Dialogs reamin on screen until the primary/required action is completed or the dialog is dismissed.

### Background

*Relevant historical or background information, related existing issues, etc.*
// TODO: Check to add PR for old dialog?

### Use Cases

Primarily used to focus the users attention to a single active window and not allow the user to interact with content ouside of the active window.
Dialogs can contain critical information, inform users about tasks, or a decision that needs to be made.
  
### Features

- **Dismiss Action:** Supports closing or dismissing the active dialog window to return user control to page content. Pressing the Escape always triggers this action, and a button should be provided to trigger this action as well.
- **Label:** Should include a label.
- **Focusable Control:** Should have at least one focusable control and keyboard focus should move to the first focusable element.

### Risks and Challenges

*Notable risks or challenges associated with implementing the component. Would we need to make any breaking changes in order to achieve this component's goals?*

### Prior Art/Examples

- [W3C Examples](https://w3c.github.io/aria-practices/examples/dialog-modal/dialog.html)
- [FAST-DNA React](https://explore.fast.design/components/dialog)
- [Material UI](https://material-ui.com/components/dialogs/#dialog)

---

## Design

*Describe the design of the component, thinking through several perspectives:*

- *A customer using the component on a web page.*
- *A developer building an app with the component and interacting through HTML/CSS/JavaScript.*
- *A designer customizing the component.*

### API

*The key elements of the component's public API surface:*

- *Component Name*
- *Props/Attrs*
- *Methods*
- *Events*

*Consider high and low-level APIs. Attempt to design a powerful and extensible low-level API with a high-level API for developer/designer ergonomics and simplicity.*

### Anatomy and Appearance

*Screenshots and/or description of the basic appearance of the component. Outline its structure with a diagram of its visual tree (shadow dom). Enumerate key areas of visual customization, such as:*

- *Slot Names*
- *Host Classes*
- *Slotted Content/Slotted Classes*
- *CSS Parts*

---

## Implementation

*Important aspects of the planned implementation with careful consideration of web standards and integration.*

### States

*Key component states, valid state transitions, and how interactions trigger a state transition.*

### Accessibility

Dialog should follow the interactiong model provided by the W3C spec here: https://w3c.github.io/aria-practices/#dialog_modal

### Globalization

*Consider whether the component has any special globalization needs such as:*

- *Special RTL handling*
- *Swapping of internal icons/visuals*
- *Localization*

### Security

*Are there any security implications surrounding the component?*

### Performance

*Are there any performance pitfalls or challenges with implementing the component?*

### Dependencies

*Will implementing the component require taking on any dependencies?*

- *3rd party libraries*
- *Upcoming standards we need to polyfill*
- *Dependencies on other fast components or utilities*

*Do any of these dependencies bring along an associated timeline?*

### Test Plan

*What is the plan for testing the component, if different from the normal path?*

### Tooling

*Are there any special considerations for tooling? Will tooling changes need to be made? Is there a special way to light up this component in our tooling that would be compelling for developers/designers?*

### Documentation

*What additions or changes are needed for user documentation and demos? Are there any architectural/engineering docs we should create as well, perhaps due to some interesting technical challenge or design decisions related to this component?*

---

## Resources

*Any related resource links such as web standards, discussion threads, diagrams, etc.*
https://w3c.github.io/aria-practices/#dialog_modal
