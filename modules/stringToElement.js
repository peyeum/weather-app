/**
 * parsing html string into element using DOMParser
 * @param {String} html html string to be parsed
 * @returns {Element} html element
 */
export const stringToElement = (html) => {
  if (!html || !window.DOMParser) return null;
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, "text/html");
  return parsed.body.firstElementChild;
};
