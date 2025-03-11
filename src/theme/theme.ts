const LightTheme = {
    colors: {
        primary: "#1abc9c",
        secondary: "#2ecc71",
        background: "#ffffff",
        text: "#333333",
    },
};

const DarkTheme = {
    colors: {
        primary: "#3498db",
        secondary: "#e74c3c",
        background: "#121212",
        text: "#ffffff",
    },
};

const Spacing = {
    gap: {
        small: 8,
        medium: 16,
        large: 24,
    },
    fontSize: {
        small: 14,
        medium: 18,
        large: 22,
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
    }
};

export type ThemeType = typeof LightTheme;
export type SpacingType = typeof Spacing;
export { DarkTheme, LightTheme };
export default Spacing;