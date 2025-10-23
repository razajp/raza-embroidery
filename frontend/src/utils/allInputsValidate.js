/**
 * allInputsValidate
 * @param {Array} inputs - Array of input objects: { value, validators }
 * @returns {Promise<{ valid: boolean, errors: Array }>}
 */
export async function allInputsValidate(inputs) {
  const errors = [];

  for (let input of inputs) {
    const { value, validators } = input;

    if (!validators || !validators.length) continue;

    for (let v of validators) {
      const isAsync = v.validate.constructor.name === "AsyncFunction";
      const valid = isAsync ? await v.validate(value) : v.validate(value);

      if (!valid) {
        errors.push({ input, message: v.message });
        break; // stop at first failed validator for this input
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
