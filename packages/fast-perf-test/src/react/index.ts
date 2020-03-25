import React from "react";
import ReactDOM from "react-dom";
import { Checkbox, TextField } from "@microsoft/fast-components-react-msft";

const root = document.createElement("div");
document.body.appendChild(root);

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

function renderItems() {
    return React.createElement(
        React.Fragment,
        {},
        new Array(typeof count === "string" ? (count as any) * 1 : 2000)
            .fill(0)
            .map((item, index) => React.createElement(TextField))
    );
}

function render(): void {
    ReactDOM.render(React.createElement(renderItems), root);
}

render();
