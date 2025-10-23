// utils/validators.js
import axios from "axios";

export const validators = {
  numeric: {
    validate: (value) => /^\d*$/.test(value),
    message: "Only numbers are allowed",
  },

  alphabetic: {
    validate: (value) => /^[a-zA-Z]*$/.test(value),
    message: "Only letters are allowed",
  },

  alphanumeric: {
    validate: (value) => /^[a-zA-Z0-9]*$/.test(value),
    message: "Only letters and numbers are allowed",
  },

  noSpecialChars: {
    validate: (value) => /^[a-zA-Z0-9 ]*$/.test(value),
    message: "No special characters allowed",
  },

  friendly: {
    validate: (value) => /^[a-zA-Z0-9 | .]*$/.test(value),
    message: "Only letters, numbers, spaces, and | or . allowed",
  },

  pin: {
    validate: (value) => /^\d{0,6}$/.test(value),
    message: "PIN must be up to 6 digits",
  },

  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Invalid email format",
  },

  phone: {
    validate: (value) => /^\d{0,4}-?\d{0,7}$/.test(value),
    message: "Phone number can have up to 11 digits",
  },

  decimal: {
    validate: (value) => /^\d*\.?\d*$/.test(value),
    message: "Only decimal numbers allowed",
  },

  customRegex: {
    validate: (value, regex) => regex.test(value),
    message: "Invalid format",
  },

  // Generic async unique validator
  unique: (table, column) => ({
    validate: async (value) => {
      if (!value) return true;

      // Remove leading and trailing spaces
      const trimmedValue = value.trim();

      try {
        const res = await axios.get(`/api/validate/${table}/check-${column}`, {
          params: { value: trimmedValue },
        });

        return res.data.unique;
      } catch (err) {
        return false;
      }
    },
    message: `${column.replaceAll('_', ' ')} already exists`,
  }),
};
