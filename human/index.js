/**
 * Human entity
 */

import World from '../world'
import Proto from '../proto'
import * as defaults from './defaults'
import constants from '../world/constants'
import * as modifiers from './modifiers'
import * as actions from './actions'
import * as states from './states'
import Kefir from 'kefir'

class Human extends Proto {

  constructor (dna) {
    super()
    if (!dna) this._generateProperties()
    else this.importProperties(dna)
    this._ai = World().ai
    this._aiActive = true
  }

  // lifecycle loops

  aiDecider () {
    let props = this.keyProperties
    if (this._aiActive) {
      let decision = this._ai.decide(props)
      if (decision !== 'idle') this.do(decision)
    } else {
      if (props[1] > 90) this.do('eat')
      else if (props[2] > 90) this.do('defecate')
      else if (props[3] > 90) this.do('sleep')
    }
  }

  cycleStart (action) {
    this.cycleStop()
    this.cycle = setInterval(() => {
      action()
      this.heartbeat()
    }, constants.time.cycle)
  }

  cycleStop () {
    clearInterval(this.cycle)
  }

  heartbeat () {
    this.properties = modifiers.grow(this.properties)
    if (modifiers.fatality(this.properties)) this.do('die')
  }

  observeDead () {
    return this.observe('handled').filter(x => x.inputType === 'die').take(1).toPromise()
  }

  observeCycle () {
    return Kefir.stream(emitter => {
      this.emitCycle = emitter
    })
  }

  // handle properties

  get keyProperties () {
    return [
      this.properties.energy,
      this.properties.hunger,
      this.properties.bowel,
      this.properties.tired
    ]
  }

  _generateProperties () {
    this.properties = defaults.generate()
  }

  // state machine setup

  get _machinery () {
    return {
      initialized: {
        _onEnter: states.initialized,
        conceive: actions.conceive
      },
      embryo: {
        _onEnter: states.embryo,
        birth: actions.birth,
        freeze: actions.freeze,
        die: actions.die
      },
      idle: {
        _onEnter: states.idle,
        sleep: actions.sleep,
        eat: actions.eat,
        defecate: actions.defecate,
        freeze: actions.freeze,
        die: actions.die
      },
      frozen: {
        _onEnter: states.frozen,
        revive: actions.revive,
        die: actions.die
      },
      sleeping: {
        _onEnter: states.sleeping,
        idle: actions.idle,
        freeze: actions.freeze,
        die: actions.die
      },
      eating: {
        _onEnter: states.eating,
        idle: actions.idle,
        freeze: actions.freeze,
        die: actions.die
      },
      defecating: {
        _onEnter: states.defecating,
        idle: actions.idle,
        freeze: actions.freeze,
        die: actions.die
      },
      dead: {
        _onEnter: states.dead
      }
    }
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
