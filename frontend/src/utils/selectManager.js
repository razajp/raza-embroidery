const selects = {};

/** Register a select by unique name */
export const registerSelect = (name, apiObject) => {
  selects[name] = apiObject;
};

/** Unregister on unmount */
export const unregisterSelect = (name) => {
  delete selects[name];
};

/** Add option to a select */
export const addOption = (selectName, option) => {
  selects[selectName]?.setOptions(prev => {
    if (prev.find(o => o.value === option.value)) return prev;
    return [...prev, option];
  });
};

/** Remove option by value */
export const removeOption = (selectName, optionValue) => {
  selects[selectName]?.setOptions(prev => prev.filter(o => o.value !== optionValue));
};

/** Select a value programmatically */
export const selectValue = (selectName, value) => {
  selects[selectName]?.setValue(value);
};

/** Deselect the current value */
export const deselectValue = (selectName) => {
  selects[selectName]?.clear();
};
