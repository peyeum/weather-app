import { round10 } from "./decimal.js";
/**
 * meter per second to kilometer per hour
 * @param {Number} val number in m/s
 * @returns {Number} number in km/h
 */
export const speed = (val) => round10((val / 1000) * 3600, -1);
