/**
 * Human entity
 */

import * as defaults from './defaults'
import * as constants from './constants'
import * as states from './states'
import * as actions from './actions'

class Human {

  constructor (props) {
    if (!props) this.generateProperties()
    if (props) this.importProperties(props)
    this.machine = states.setup(this, this.state)
  }

  // state machine shorthand

  get state () {
    let current = (this.machine ? this.machine.state : this.properties.state)
    this.properties.state = current
    return current
  }

  set state (state) {
    this.machine.transition(state)
    return this.state
  }

  // lifecycle loops

  cycleStart (action) {
    this.cycleStop()
    this.cycle = setInterval(() => {
      action()
      this.heartbeat()
    }, constants.cycleTime)
  }

  cycleStop () {
    clearInterval(this.cycle)
  }

  heartbeat () {
    this.properties = actions.grow(this.properties)
    if (actions.fatality(this.properties)) {
      this.machine.die()
    }
  }

  // handle properties

  generateProperties () {
    this.properties = defaults.generate()
  }

  importProperties (properties) {
    this.properties = JSON.parse(properties)
  }

  exportProperties () {
    this.properties.state = this.state
    return JSON.stringify(this.properties)
  }

  // next level shit

  // async beat () {
  //   if (this.properties.hunger > 90) await this.eat()
  //   if (this.properties.bowel > 90) await this.defecate()
  //   if (this.properties.tired > 90) await this.sleep()
  // }
  //
  // eat () {
  //   this.state('eating')
  //   return this.cycle((resolve, reject) => {
  //     actions.eat()
  //     if (this.properties.hunger < 9) resolve()
  //   })
  // }
  //
  // cycle (action) {
  //   return new Promise((resolve, reject) => {
  //     this.cycle = setInterval(() => { action(resolve, reject) }, constants.cycleTime)
  //   })
  // }

}

export default Human
