export const capitalizeFirstLetter = string => {
  if (typeof string !== 'string') return '';
  return string && string.replace(string[0], string[0].toUpperCase());
};
