/**
 * Sentient
 */

import synaptic from 'synaptic'
import trainData from './tests/_train'

// energy, hunger, bowel, sleepiness
// idle, eat, defecate, sleep

class Sentient {

  constructor () {
    this.ai = new synaptic.Architect.Perceptron(4, 10, 4)
  }

  train (data) {
    return this.ai.trainer.train(trainData, {
      iterations: 10000,
      error: 0.0001
    })
  }

  decide (inputs) {
    let result = this.ai.activate(inputs)
    let max = Math.max(...result)
    let index = result.indexOf(max)
    switch (index) {
      case 0: return 'idle'
      case 1: return 'eat'
      case 2: return 'defecate'
      case 3: return 'sleep'
      default: return 'idle'
    }
  }
}

export default Sentient
