class Dom {}

export const $ = () => new Dom();

$.create = (tagName, className, ...classes) => {
  const el = document.createElement(tagName);
  if (className) el.classList.add(className, ...classes);
  return el;
};
