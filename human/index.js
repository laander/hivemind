/**
 * Human entity
 */

import * as conception from './conception'
import * as constants from './constants'
import * as state from './state'
import * as actions from './actions'
import * as utils from './utils'

class Human {

  constructor (props) {
    utils.log('human: constructing')

    // set lifecycle heartbeat
    this.heartbeat = null

    // if generate = true, build a new human
    if (!props) this.generate()
    if (props) this.reviveMind(props)

    // setup statemachine for human states
    this.fsm = state.newMachine(this, (props ? 'idle' : 'embryo'))
  }

  generate () {
    utils.log('human: generate')
    this.properties = {
      guid: conception.guid(),
      name: conception.name(),
      gender: conception.gender(),
      birthday: conception.birthday(),
      ssn: conception.ssn(),
      deathday: conception.deathday,
      age: conception.age,
      weight: conception.weight,
      energy: conception.energy,
      hunger: conception.hunger,
      tired: conception.tired,
      bowel: conception.bowel
    }
  }

  currentState () {
    return this.fsm.state
  }

  heartbeatStart (action) {
    utils.log('human: start')
    this.heartbeatStop()
    this.heartbeat = setInterval(() => {
      this.properties = actions.grow(this.properties)
      if (actions.fatality(this.properties)) {
        this.fsm.die()
      }
      action()
    }, constants.cycleTime)
  }

  heartbeatStop () {
    utils.log('human: stop')
    clearInterval(this.heartbeat)
  }

  freezeMind () {
    utils.log('human: deepfreeze')
    this.fsm.freeze()
    return JSON.stringify(this.properties)
  }

  reviveMind (properties) {
    utils.log('human: revive')
    this.properties = JSON.parse(properties)
  }

}

export default Human
