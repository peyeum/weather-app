/**
 * clock
 * @param {Element} element the clock element in DOM
 */
const clock = (element) => {
  element.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  setTimeout(() => clock(element), 1000);
};

export default clock;
