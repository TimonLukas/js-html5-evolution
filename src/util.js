/**
 * Returns the binary string representation of a number.
 * @param {Number} number
 * @return {String} Binary string representing the number
 */
const toBinaryString = number => number.toString(2);

/**
 * Returns the number corresponding to a binary string
 * @param {String} string
 * @return {Number} Number corresponding to the binary string
 */
const fromBinaryString = string => parseInt(string, 2);

module.exports = {
  toBinaryString,
  fromBinaryString,
};