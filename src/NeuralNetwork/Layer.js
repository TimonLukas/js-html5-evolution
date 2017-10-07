module.exports = class Layer {
  constructor(neurons) {
    this.neurons = neurons;
  }

  /**
   * @param {Layer} layer
   */
  setInput(layer) {
    this.neurons.map((neuron) => { // eslint-disable-line
      neuron.inputs = layer.neurons; // eslint-disable-line
    });
  }

  /**
   * @param {Layer} layer
   */
  setOutput(layer) {
    layer.setInput(this);
  }

  encode() {
    return this.neurons.map(neuron => neuron.encode()).join(';');
  }
};
