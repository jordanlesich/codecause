import kebabCase from "lodash.kebabcase";

export const unicodeKebabCase = (str) => {
  return kebabCase(str).replace("-", String.fromCharCode(0x2011));
};
export const unicodeHyphens = (str) => {
  return str.replace("-", String.fromCharCode(0x2011));
};
