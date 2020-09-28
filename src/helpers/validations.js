// Form Validation Values

const VALID_EMAIL_REGEX = /^.+@.+\..+/;

export const notEmpty = (val) => val.trim() !== "";
export const isValidEmail = (val) => VALID_EMAIL_REGEX.test(val);
export const isRangeCharacters = ([min, max]) => (val) =>
  val.length <= max && val.length >= min;
export const isMoreThanXCharacters = (x) => (val) => val.length > x;
export const containsUpperCaseLetter = (val) => /[A-Z]/.test(val);
export const containsLetter = (val) => /[a-zA-Z]/.test(val);
export const containsNumber = (val) => /[0-9]/.test(val);
export const onlyAlphaNumeric = (val) => /^[^\W_+]+$/.test(val);
