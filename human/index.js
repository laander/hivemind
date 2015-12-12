/**
 * Human entity
 */

import Proto from '../proto'
import * as defaults from './defaults'
import * as constants from './constants'
import * as machine from './machine'
import * as actions from './actions'

class Human extends Proto {

  constructor (dna) {
    super({
      initialState: 'embryo',
      states: machine.states,
      transitions: machine.transitions
    })
    if (!dna) this.generateProperties()
    if (dna) this.importProperties(dna)
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
    return JSON.stringify(this.properties)
  }

  // next level shit

  // async idle () {
  //   if (this.properties.hunger > 90) await this.action('eat')
  //   if (this.properties.bowel > 90) await this.action('defecate')
  //   if (this.properties.tired > 90) await this.action('sleep')
  //   this.properties = actions.idle(this.properties)
  // }
  //
  // eating (done) {
  //   if (this.properties.hunger < 9) done()
  //   this.properties = modifier.eat()
  // }
  //
  // eat (props) {
  //   props.hunger = sub(props.hunger, 3)
  //   props.weight = add(props.weight, 0.5)
  //   props.bowel = add(props.bowel, 2)
  //   props.tired = add(props.tired, 0.5)
  //   props.energy = add(props.energy)
  //   return props
  // }
  //
  // async action (action) {
  //   this.state = this.transitions(action)
  //   await this.cycle((resolve, reject) => {
  //     if (!this.actions[action]) reject()
  //     this[action](resolve)
  //   })
  // }s
  //
  // cycle (action) {
  //   return new Promise((resolve, reject) => {
  //     this.cycle = setInterval(() => {
  //       action(resolve, reject)
  //     }, constants.cycleTime)
  //   })
  // }

}

export default Human
