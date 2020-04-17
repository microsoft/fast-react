export enum Theme {
    light,
    dark,
}

export interface ThemeSelectorProps {
    id: string;
    theme: Theme;
    onUpdateTheme: any;
}
