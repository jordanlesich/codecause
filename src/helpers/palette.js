export const getColor = (name) => {
  const palette = {
    white: "#ffffff",
    lightgrey: "#f6f8fa",
    darkgrey: "#2f363d",
    dark: "#0c131a",
    darkHighlight: "#182533",
    lightBorder: "#e1e4e8",
    clearBorder: "#e1e4e8",
    font: "rgb(41,41,41)",
    success: "#2ea44f",
    //500
    info: "#6f42c1",
    //000
    infoBG: "#f5f0ff",
    //100
    infoLight: "#e6dcfd",
    //200
    infoMed: "#d1bcf9",
    danger: "#d73a49",
    //500
    primary: "#0366d6",
    //000
    primaryBG: "#f1f8ff",
    //100
    primaryLight: "#dbedff",
    //200
    primaryLight2: "#c8e1ff",
    //300
    primaryMed: "#79b8ff",

    secondary: "#959da5",
    secondary000: "#fafbfc",
    secondary100: "#f6f8fa",
    secondary200: "#e1e4e8",
    secondary300: "#d1d5da",
    secondary500: "#6a737d",
    secondary600: "#586069",
  };
  return palette[name];
};
