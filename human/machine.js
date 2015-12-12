/**
 * Human states
 */

import moment from 'moment'
import * as actions from './actions'

export var transitions = {
  birth: function () { this.transition('idle') },
  idle: function () { this.transition('idle') },
  revive: function () { if (this.state !== 'dead') this.transition('idle') },
  freeze: function () { this.transition('frozen') },
  sleep: function () { this.transition('sleeping') },
  eat: function () { this.transition('eating') },
  defecate: function () { this.transition('defecating') },
  die: function () { this.transition('dead') }
}

export var states = {
  embryo: function () { },
  idle: function () {
    this.mother.cycleStart(() => {
      let props = this.mother.properties
      props = actions.idle(props)
      if (props.hunger > 90) this.eat()
      if (props.bowel > 90) this.defecate()
      if (props.tired > 90) this.sleep()
    })
  },
  frozen: function () {
    this.mother.cycleStop()
  },
  sleeping: function () {
    this.mother.cycleStart(() => {
      let props = this.mother.properties
      props = actions.sleep(props)
      if (props.tired < 5) this.idle()
    })
  },
  eating: function () {
    this.mother.cycleStart(() => {
      let props = this.mother.properties
      props = actions.eat(props)
      if (props.hunger < 5) this.idle()
    })
  },
  defecating: function () {
    this.mother.cycleStart(() => {
      let props = this.mother.properties
      props = actions.defecate(props)
      if (props.bowel < 5) this.idle()
    })
  },
  dead: function () {
    this.mother.properties.deathday = moment().format()
    this.mother.cycleStop()
  }
}
