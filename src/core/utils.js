export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string && string.replace(string[0], string[0].toUpperCase());
};

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end];

  return new Array(end - start + 1).fill('').map((_, ind) => start + ind);
};
