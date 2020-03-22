import {
    customElement,
    FastElement,
    html,
    observable,
    when,
} from "@microsoft/fast-element";

const template = html<WhenTest>`
    <div>
        ${when(
            x => x.flag,
            html<WhenTest>`
            <p>TEST</p>    
        `
        )}
    </div>
`;

@customElement({
    name: "when-test",
    template,
})
export class WhenTest extends FastElement {
    @observable
    public data = [];
    private dataChanged() {
        this.flag = !this.flag;
    }

    @observable
    public flag: boolean = false;
    private flagChanged() {
        console.log("Should show test text", this.flag);
    }
}
