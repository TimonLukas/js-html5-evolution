/* eslint no-param-reassign: 0 */

const { toBinaryString } = require('./../util');

module.exports = class Neuron {
  constructor(bias, factor) {
    this.bias = bias;
    this.factor = factor;
    this.inputs = [];
  }

  getOutput(value) {
    if (this.inputs.length > 0) {
      value = this.inputs.reduce((acc, neuron) => acc + neuron.getOutput(value));
    }

    return this.bias + (this.factor * value);
  }

  encode() {
    const encodeNumber = (number) => {
      if (number < 0) {
        return `1${toBinaryString(Math.abs(number))}`;
      }

      return `0${toBinaryString(number)}`;
    };

    return `${encodeNumber(this.bias)};${encodeNumber(this.factor)}`;
  }
};
