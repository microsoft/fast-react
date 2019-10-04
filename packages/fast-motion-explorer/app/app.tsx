import React, { Component } from "react";
import { render } from "react-dom";
import { bezier, duration } from "@microsoft/fast-components-styles-msft";

export default class App extends Component {
    public render(): JSX.Element {
        return (
            <div>
                <table>
                    <caption>Design spec</caption>
                    <thead>
                        <tr>
                            <td>Level</td>
                            <td>Multiplier</td>
                            <td>Base duration</td>
                            <td>Bezier curve</td>
                        </tr>
                    </thead>
                    <tr>
                        <td>None</td>
                        <td>0</td>
                        <td>0</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>Minimal</td>
                        <td>1</td>
                        <td>200ms</td>
                        <td>0.10, 0.40, 0.00, 1.00</td>
                    </tr>
                    <tr>
                        <td>Subtle</td>
                        <td>2</td>
                        <td>250ms</td>
                        <td>0.20, 0.30, 0.10, 1.00</td>
                    </tr>
                    <tr>
                        <td>Default</td>
                        <td>3</td>
                        <td>300ms</td>
                        <td>0.30, 0.20, 0.20,1.00</td>
                    </tr>
                    <tr>
                        <td>Extra</td>
                        <td>4</td>
                        <td>350ms</td>
                        <td>0.40, 0.10, 0.30, 1.00</td>
                    </tr>
                    <tr>
                        <td>Expressive</td>
                        <td>5</td>
                        <td>400ms</td>
                        <td>0.50, 0.00, 0.40, 1.00</td>
                    </tr>
                </table>
                <table>
                    <caption>Relational</caption>
                    <thead>
                        <tr>
                            <td>Level</td>
                            <td>Multiplier</td>
                            <td>Base duration</td>
                            <td>Bezier curve</td>
                        </tr>
                    </thead>
                    {[
                        [0, "None"],
                        [0.2, "Minimal"],
                        [0.4, "Subtle"],
                        [0.6, "Default"],
                        [0.8, "Extra"],
                        [1, "Expressive"],
                    ].map((conf: [number, string]): JSX.Element => {
                        const [value, label]: [number, string] = conf;

                        return (
                            <tr>
                                <td>{label}</td>
                                <td>{value}</td>
                                <td>{this.duration(value)}</td>
                                <td>{this.bezier(value)}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
    private toFixed(value: number): string {
        return Math.max(Math.min(value, 1), 0).toFixed(2);
    }

    private bezier(value: number): string {
        return `${this.toFixed(value / 2)}, ${this.toFixed(
            0.5 - value / 2
        )}, ${this.toFixed(value / 2 - 0.1)}, ${this.toFixed(1)}`;
    }

    private duration(value: number): string {
        return `${150 + value * 250}ms`;
    }
}
