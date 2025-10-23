export const textTransformers = {
  uppercase: (val) => val.toUpperCase(),
  lowercase: (val) => val.toLowerCase(),
  capitalize: (val) => val.replace(/\b\w/g, (char) => char.toUpperCase()),
  sentenceCase: (val) =>
    val.replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase()),

  // ✅ Phone formatter — adds '-' after 4 digits, keeps rest as is
  phone: (val) => {
    if (!val) return "";
    val = val.replace(/[^\d]/g, ""); // remove non-digits
    if (val.length > 4) val = val.slice(0, 4) + "-" + val.slice(4);
    return val;
  },
};
