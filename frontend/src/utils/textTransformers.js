export const textTransformers = {
  uppercase: (val) => val.toUpperCase(),
  lowercase: (val) => val.toLowerCase(),
  capitalize: (val) => val.replace(/\b\w/g, (char) => char.toUpperCase()),
  sentenceCase: (val) =>
    val.replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase()),
};
