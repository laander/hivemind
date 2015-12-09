/**
 * Human states
 */

import machina from 'machina'
import moment from 'moment'
import * as acts from './actions'
import * as utils from './utils'

let states = {
  embryo: {
    _onEnter: function () {
      utils.log('state: born')
      this.human.heartbeatStart(() => {
        let props = this.human.properties
        if (props.age > 0.1) {
          this.idle()
        }
      })
    }
  },
  idle: {
    _onEnter: function () {
      utils.log('state: idle')
      this.human.heartbeatStart(() => {
        let props = this.human.properties
        props = acts.idle(props)
        if (props.hunger > 90) {
          this.eat()
        }
        if (props.tired > 90) {
          this.sleep()
        }
      })
    }
  },
  frozen: {
    _onEnter: function () {
      utils.log('state: frozen')
      this.human.heartbeatStop()
    }
  },
  sleeping: {
    _onEnter: function () {
      utils.log('state: sleeping')
      this.human.heartbeatStart(() => {
        let props = this.human.properties
        props = acts.sleep(props)
        if (props.tired < 5) {
          this.idle()
        }
      })
    }
  },
  eating: {
    _onEnter: function () {
      utils.log('state: eating')
      this.human.heartbeatStart(() => {
        let props = this.human.properties
        props = acts.eat(props)
        if (props.hunger < 5) {
          this.idle()
        }
      })
    }
  },
  dead: {
    _onEnter: function () {
      utils.log('state: dead')
      this.human.properties.deathday = moment().format()
      this.human.heartbeatStop()
    }
  }
}

let actions = {
  birth: function () {
    utils.log('transition: birth')
    this.transition('embryo')
  },
  idle: function () {
    utils.log('transition: idle')
    this.transition('idle')
  },
  freeze: function () {
    utils.log('transition: freeze')
    this.transition('frozen')
  },
  sleep: function () {
    utils.log('transition: sleep')
    this.transition('sleeping')
  },
  eat: function () {
    utils.log('transition: eat')
    this.transition('eating')
  },
  die: function () {
    utils.log('transition: kill')
    this.transition('dead')
  }
}

export function newMachine (human, initial) {
  return new machina.Fsm({
    initialize: function () {
      this.human = human
    },
    namespace: 'human',
    initialState: initial,
    states: states,
    // setup actions
    birth: actions.birth,
    idle: actions.idle,
    freeze: actions.freeze,
    sleep: actions.sleep,
    eat: actions.eat,
    die: actions.die
  })
}
