export const getColor = (name) => {
  const palette = {
    white: "#ffffff",
    dark: "#394352",
    font: "#394352",
    lightBorder: "#ced6e2",
    primary: "#005FCC",

    blue000: "#E6F0FC",
    blue100: "#99C3F3",
    blue200: "#3388E9",
    blue300: "#006AE3",
    blue400: "#005FCC",
    blue500: "#0055B6",
    blue600: "#004089",

    grey000: "#FFFFFF",
    grey100: "#F6F7F9",
    grey200: "#E8EEF2",
    grey300: "#CED6E2",
    grey400: "#93A0B3",
    grey500: "#617089",
    grey600: "#394352",

    purple000: "#F4ECF6",
    purple100: "#D3B1DB",
    purple200: "#A764B7",
    purple300: "#913DA5",
    purple400: "#823794",
    purple500: "#743184",
    purple600: "#572563",

    red000: "#FBEBED",
    red100: "#EFACB5",
    red200: "#E0596C",
    red300: "#D82F47",
    red400: "#C22A40",
    red500: "#AD2639",
    red600: "#821C2B",

    green000: "#ECF6EC",
    green100: "#B1DBB3",
    green200: "#64B768",
    green300: "#3DA542",
    green400: "#37943B",
    green500: "#318435",
    green600: "#256328",
  };
  return palette[name];
};
