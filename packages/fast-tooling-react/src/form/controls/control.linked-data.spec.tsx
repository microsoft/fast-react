import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, ReactWrapper } from "enzyme";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
    keyCodeArrowDown,
    keyCodeArrowUp,
    keyCodeEnter,
} from "@microsoft/fast-web-utilities";
import { LinkedDataControl } from "./control.linked-data";
import { LinkedDataControlProps } from "./control.linked-data.props";
import { LinkedDataControlClassNameContract } from "./control.linked-data.style";
import { ControlType } from "../templates";

const LinkedDataFormControlWithDragAndDrop: React.FC<any> = (
    props: React.PropsWithChildren<any>
): React.ReactElement => {
    return (
        <DndProvider backend={HTML5Backend}>
            <LinkedDataControl {...props} />
        </DndProvider>
    );
};

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const managedClasses: LinkedDataControlClassNameContract = {
    linkedDataControl: "linkedDataFormControl-class",
    linkedDataControl_linkedDataListControl:
        "linkedDataFormControl_linkedDataListControl-class",
    linkedDataControl_linkedDataListInput:
        "linkedDataFormControl_linkedDataListInput-class",
    linkedDataControl_delete: "linkedDataFormControl_delete-class",
    linkedDataControl_deleteButton: "linkedDataFormControl_deleteButton-class",
    linkedDataControl_existingLinkedData:
        "linkedDataFormControl_existingLinkedData-class",
    linkedDataControl_existingLinkedDataItem:
        "linkedDataFormControl_existingLinkedDataItem-class",
    linkedDataControl_existingLinkedDataItemContent:
        "linkedDataFormControl_existingLinkedDataItemContent-class",
    linkedDataControl_existingLinkedDataItemLink:
        "linkedDataFormControl_existingLinkedDataItemLink-class",
    linkedDataControl_existingLinkedDataItemName:
        "linkedDataFormControl_existingLinkedDataItemName-class",
};

const linkedDataProps: LinkedDataControlProps = {
    type: ControlType.linkedData,
    schemaDictionary: {
        alpha: {
            id: "alpha",
            type: "object",
            properties: {},
        },
        beta: {
            id: "beta",
            type: "object",
            properties: {},
        },
        omega: {
            id: "omega",
            type: "object",
            properties: {},
        },
    },
    required: false,
    dataLocation: "locationOfLinkedData",
    navigationConfigId: "",
    dictionaryId: "",
    dataDictionary: [
        {
            "": {
                schemaId: "",
                data: {},
            },
        },
        "",
    ],
    navigation: {},
    value: undefined,
    schema: {},
    onChange: jest.fn(),
    onUpdateSection: jest.fn(),
    reportValidity: jest.fn(),
    updateValidity: jest.fn(),
    disabled: false,
    elementRef: null,
    validationErrors: [],
};

/* tslint:disable:no-string-literal */
describe("LinkedDataControl", () => {
    test("should not throw", () => {
        expect(() => {
            mount(
                <LinkedDataFormControlWithDragAndDrop
                    {...linkedDataProps}
                    managedClasses={managedClasses}
                />
            );
        }).not.toThrow();
    });
    // test("should generate a text input", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     expect(rendered.find("input")).toHaveLength(1);
    // });
    // test("should add an `aria-autocomplete` with `list` value on a text input", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const input: any = rendered.find("input");

    //     expect(input.props()["aria-autocomplete"]).toEqual("list");
    // });
    // test("should generate a button", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     expect(rendered.find("button")).toHaveLength(1);
    // });
    // test("should generate a listbox", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const listbox: any = rendered.find("ul");

    //     expect(listbox).toHaveLength(1);
    //     expect(listbox.props()["role"]).toEqual("listbox");
    // });
    // test("should add an `aria-controls` on a text input with the same value as the id of the `listbox`", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const inputAriaControls: string = rendered.find("input").props()["aria-controls"];
    //     const listboxId: string = rendered.find("ul").props()["id"];

    //     expect(inputAriaControls).toEqual(listboxId);
    // });
    // test("should have a listbox with an `aria-hidden` attribute set to `true`", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const listbox: any = rendered.find("ul");

    //     expect(listbox.props()["aria-hidden"]).toEqual(true);
    // });
    // test("should have a listbox with an `aria-hidden` attribute set to `false` when the button is clicked", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const button: any = rendered.find("button");

    //     button.simulate("click");

    //     const listbox: any = rendered.find("ul");

    //     expect(listbox.props()["aria-hidden"]).toEqual(false);
    // });
    // test("should generate options based on the `childOptions` provided", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const listboxItems: any = rendered.find("ul li");

    //     expect(listboxItems).toHaveLength(3);
    // });
    // test("should generate options based on the `childOptions` provided and filtered by a search term", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const input: any = rendered.find("input");

    //     input.simulate("change", { target: { value: "beta" } });

    //     const listboxItems: any = rendered.find("ul li");

    //     expect(listboxItems).toHaveLength(2);
    // });
    // test("should have a listbox that can be navigated by the `down` key", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const button: any = rendered.find("button");
    //     const input: any = rendered.find("input");

    //     button.simulate("click");

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowDown });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(1)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowDown });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(1)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(2)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowDown });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(2)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(true);
    // });
    // test("should have a listbox that can be navigated by the `up` key", () => {
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //         />
    //     );
    //     const button: any = rendered.find("button");
    //     const input: any = rendered.find("input");

    //     button.simulate("click");

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowUp });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(2)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowUp });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(2)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(1)
    //             .props()["aria-selected"]
    //     ).toEqual(true);

    //     input.simulate("keydown", { keyCode: keyCodeArrowUp });

    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(1)
    //             .props()["aria-selected"]
    //     ).toEqual(false);
    //     expect(
    //         rendered
    //             .find("ul li")
    //             .at(0)
    //             .props()["aria-selected"]
    //     ).toEqual(true);
    // });
    // test("should show if linkedData are present in the data as an item with a button", () => {
    //     const renderedWithOneChild: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             value={{ id: "alpha", props: {} }}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     expect(
    //         renderedWithOneChild
    //             .find("ul")
    //             .at(0)
    //             .find("li")
    //     ).toHaveLength(1);

    //     const renderedWithOneChildString: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             value={"hello world"}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     expect(
    //         renderedWithOneChild
    //             .find("ul")
    //             .at(0)
    //             .find("li")
    //     ).toHaveLength(1);

    //     const renderedWithThreeLinkedData: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //             value={[
    //                 {
    //                     id: "alpha",
    //                     props: {},
    //                 },
    //                 {
    //                     id: "beta",
    //                     props: {},
    //                 },
    //                 "hello world",
    //             ]}
    //         />
    //     );

    //     expect(
    //         renderedWithThreeLinkedData
    //             .find("ul")
    //             .at(0)
    //             .find("li")
    //     ).toHaveLength(3);
    // });
    // test("should fire a callback to update the data when an `option` in the `listbox` is clicked", () => {
    //     const callback: any = jest.fn();
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             onChange={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered
    //         .find("ul")
    //         .at(0)
    //         .find("li")
    //         .at(1)
    //         .simulate("click");

    //     expect(callback).toHaveBeenCalled();
    //     expect(callback.mock.calls[0][0]).toEqual({
    //         value: [{ id: "beta", props: {} }],
    //     });
    // });
    // test("should fire a callback to update the data when a default text `option` in the `listbox` is clicked", () => {
    //     const callback: any = jest.fn();
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //             defaultChildOptions={["text"]}
    //             onChange={callback}
    //         />
    //     );

    //     rendered
    //         .find("ul")
    //         .at(0)
    //         .find("li")
    //         .at(0)
    //         .simulate("click");

    //     expect(callback).toHaveBeenCalled();
    //     expect(Array.isArray(callback.mock.calls[0][0].value)).toBe(true);
    //     expect(typeof callback.mock.calls[0][0].value[0]).toEqual("string");
    // });
    // test("should update active section to item clicked when ctrl key is pressed and a new item is provided", () => {
    //     const childItem: any = Symbol();
    //     const callback: any = jest.fn();
    //     const rendered: ReactWrapper = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             onUpdateSection={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered
    //         .find("ul")
    //         .at(0)
    //         .find("li")
    //         .at(1)
    //         .simulate("click", { ctrlKey: true });

    //     rendered.setProps(
    //         Object.assign({}, linkedDataProps, {
    //             value: childItem,
    //             onUpdateSection: callback,
    //         })
    //     );

    //     expect(callback).toHaveBeenCalled();
    //     expect(callback.mock.calls[0][0].dataLocation).toEqual(
    //         "locationOfLinkedData.props"
    //     );
    // });
    // test("should update active section to item clicked when ctrl key is pressed and a new item is provided to an existing set of items", () => {
    //     const callback: any = jest.fn();
    //     const rendered: ReactWrapper = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             value={[Symbol(), Symbol()]}
    //             onUpdateSection={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered
    //         .find("ul")
    //         .at(1)
    //         .find("li")
    //         .at(1)
    //         .simulate("click", { ctrlKey: true });

    //     rendered.setProps(
    //         Object.assign({}, linkedDataProps, {
    //             value: [Symbol(), Symbol(), Symbol()],
    //             onUpdateSection: callback,
    //         })
    //     );

    //     expect(callback).toHaveBeenCalled();
    //     expect(callback.mock.calls[0][0].dataLocation).toEqual(
    //         "locationOfLinkedData[2].props"
    //     );
    // });
    // test("should not add a child option to the data when a value has been added to the `input` that is an empty string", () => {
    //     const callback: any = jest.fn();
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             onChange={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered.find("input").simulate("change", { target: { value: "" } });
    //     rendered.find("input").simulate("keydown", { keyCode: keyCodeEnter });

    //     expect(callback).not.toHaveBeenCalled();
    // });
    // test("should not add a child option to the data when a value has been added to the `input` that does not partially match any of the options", () => {
    //     const callback: any = jest.fn();
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             onChange={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered.find("input").simulate("change", { target: { value: "echo" } });
    //     rendered.find("input").simulate("keydown", { keyCode: keyCodeEnter });

    //     expect(callback).not.toHaveBeenCalled();
    // });
    // test("should add a child option to the data when a value has been added to the `input` that at least partially matches one of the options", () => {
    //     const callback: any = jest.fn();
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             onChange={callback}
    //             managedClasses={managedClasses}
    //         />
    //     );

    //     rendered.find("input").simulate("change", { target: { value: "b" } });
    //     rendered.find("input").simulate("keydown", { keyCode: keyCodeEnter });

    //     expect(callback).toHaveBeenCalled();
    //     expect(callback.mock.calls[0][0]).toEqual({
    //         value: [{ id: "beta", props: {} }],
    //     });
    // });
    // test("should remove a child option from the data when the remove button has been clicked", () => {
    //     const callback: any = jest.fn();
    //     const renderedWithTwoLinkedData: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //             value={[
    //                 {
    //                     id: "alpha",
    //                     props: {},
    //                 },
    //                 {
    //                     id: "beta",
    //                     props: {},
    //                 },
    //             ]}
    //             onChange={callback}
    //         />
    //     );

    //     renderedWithTwoLinkedData
    //         .find("ul")
    //         .at(0)
    //         .find("li")
    //         .at(1)
    //         .find("button")
    //         .simulate("click");

    //     expect(callback).toHaveBeenCalled();
    //     expect(callback.mock.calls[0][0]).toEqual({
    //         value: undefined,
    //         isArray: true,
    //         index: 1,
    //     });
    // });
    // test("should show default values if they exist and no data is available", () => {
    //     const linkedData: string = "foo";
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //             value={undefined}
    //             default={linkedData}
    //         />
    //     );

    //     expect(rendered.html().includes(linkedData)).toBe(true);
    // });
    // test("should not show default values if data exists", () => {
    //     const linkedData: string = "foo";
    //     const defaultLinkedData: string = "bar";
    //     const rendered: any = mount(
    //         <LinkedDataFormControlWithDragAndDrop
    //             {...linkedDataProps}
    //             managedClasses={managedClasses}
    //             value={linkedData}
    //             default={defaultLinkedData}
    //         />
    //     );
    //     expect(rendered.html().includes(linkedData)).toBe(true);
    //     expect(rendered.html().includes(defaultLinkedData)).toBe(false);
    // });
});
