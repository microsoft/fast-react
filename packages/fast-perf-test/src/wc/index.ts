import {
    FastElement,
    customElement,
    repeat,
    html,
    observable,
} from "@microsoft/fast-element";
import {
    FASTCheckbox,
    FASTDesignSystemProvider,
    FASTTextField,
} from "@microsoft/fast-components";

FASTCheckbox;
FASTDesignSystemProvider;
FASTTextField;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

const count = getQueryVariable("count");

const template = html<PerfTest>`
    <fast-design-system-provider>
        ${repeat(
            x => x.items,
            html`
            <fast-text-field></fast-text-field>
        `
        )}
    </fast-design-system-provider>
`;
@customElement({
    name: "perf-test",
    template,
})
class PerfTest extends FastElement {
    @observable
    public items: number[] = new Array(
        typeof count === "string" ? (count as any) * 1 : 2000
    ).fill(0);
}

document.body.appendChild(document.createElement("perf-test"));
