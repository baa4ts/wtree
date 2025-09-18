import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1a1a1a",
    background: "#f9f9fb",
    card: "#ffffff",
    border: "#e0e0e0",
    accent: "#4e5ac7",
    subtext: "#666666",
    fire: "#FF4400",
    sheet: "#00FFAA",
  },
  dark: {
    text: "#ffffff",
    background: "#121212",
    card: "#1e1e1e",
    border: "#333333",
    accent: "#ff9800",
    subtext: "#aaaaaa",
    fire: "#FF4400",
    sheet: "#00FFAA",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
