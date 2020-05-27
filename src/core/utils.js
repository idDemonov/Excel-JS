export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string && string.replace(string[0], string[0].toUpperCase());
};

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end];

  return new Array(end - start + 1).fill('').map((_, ind) => start + ind);
};

export const storage = (key, data = null) => {
  if (!data) return JSON.parse(localStorage.getItem(key));

  return localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const camelCaseToDash = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (style = {}) => {
  return Object.keys(style)
    .map((key) => `${camelCaseToDash(key)}: ${style[key]}`)
    .join(';');
};
