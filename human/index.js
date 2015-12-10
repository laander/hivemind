/**
 * Human entity
 */

import * as defaults from './defaults'
import * as constants from './constants'
import * as states from './states'
import * as actions from './actions'
import * as utils from './utils'

class Human {

  constructor (props) {
    utils.log('human: constructing')

    // if properties is passed then import, otherwise generate new
    if (!props) this.generateProperties()
    if (props) this.importProperties(props)

    // setup statemachine for human states with initial state
    this.machine = states.setup(this, this.state)
  }

  // state machine shorthand

  get state () {
    let current = (this.machine ? this.machine.state : this.properties.state || defaults.state)
    this.properties.state = current
    return current
  }

  set state (state) {
    this.machine.transition(state)
    return this.state
  }

  // lifecycle loops

  heartbeatStart (action) {
    this.heartbeatStop()
    this.heartbeat = setInterval(() => {
      action()
      this.bioLoop()
    }, constants.cycleTime)
  }

  heartbeatStop () {
    utils.log('human: stop')
    clearInterval(this.heartbeat)
  }

  bioLoop () {
    this.properties = actions.grow(this.properties)
    if (actions.fatality(this.properties)) {
      this.machine.die()
    }
  }

  // handle properties

  generateProperties () {
    utils.log('human: generate')
    this.properties = defaults.generate()
  }

  importProperties (properties) {
    utils.log('human: revive')
    this.properties = JSON.parse(properties)
  }

  exportProperties () {
    utils.log('human: deepfreeze')
    this.properties.state = this.state
    return JSON.stringify(this.properties)
  }

}

export default Human
