/**
 * Human states
 */

import machina from 'machina'
import moment from 'moment'
import * as actions from './actions'

// define transitions

let transitions = {
  birth: function () { this.transition('embryo') },
  idle: function () { this.transition('idle') },
  freeze: function () { this.transition('frozen') },
  sleep: function () { this.transition('sleeping') },
  eat: function () { this.transition('eating') },
  defecate: function () { this.transition('defecating') },
  die: function () { this.transition('dead') }
}

// define states

let states = {
  embryo: function () {
    this.human.cycleStart(() => {
      let props = this.human.properties
      if (props.age > 0.1) this.idle()
    })
  },
  idle: function () {
    this.human.cycleStart(() => {
      let props = this.human.properties
      props = actions.idle(props)
      if (props.hunger > 90) this.eat()
      if (props.bowel > 90) this.defecate()
      if (props.tired > 90) this.sleep()
    })
  },
  frozen: function () {
    this.human.cycleStop()
  },
  sleeping: function () {
    this.human.cycleStart(() => {
      let props = this.human.properties
      props = actions.sleep(props)
      if (props.tired < 5) this.idle()
    })
  },
  eating: function () {
    this.human.cycleStart(() => {
      let props = this.human.properties
      props = actions.eat(props)
      if (props.hunger < 5) this.idle()
    })
  },
  defecating: function () {
    this.human.cycleStart(() => {
      let props = this.human.properties
      props = actions.defecate(props)
      if (props.bowel < 5) this.idle()
    })
  },
  dead: function () {
    this.human.properties.deathday = moment().format()
    this.human.cycleStop()
  }
}

Object.keys(states).forEach(state => states[state] = { _onEnter: states[state] })

export function setup (human, initial) {
  return new machina.Fsm(Object.assign({
    initialize: function () {
      this.human = human
    },
    namespace: 'human',
    initialState: initial,
    states: states
  }, transitions))
}
