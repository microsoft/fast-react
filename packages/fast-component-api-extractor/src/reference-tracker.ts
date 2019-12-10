export class ReferenceTracker {
    private _references: any[] = [];

    public get references(): any[] {
        return this._references;
    }

    public addReference<T extends { id: number }>(reference: T): void {
        this._references = this._references.concat(reference);
    }
}
