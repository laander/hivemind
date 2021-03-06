/**
 * Pod
 */

import Proto from '../proto'
import Human from '../human'
import * as states from './states'
import * as actions from './actions'
import * as defaults from './defaults'
// import listeners from './listeners'
import { PodError } from './utils'

class Pod extends Proto {

  constructor (blueprint) {
    super() // { listeners: listeners }
    this._cryoBank = []
    this._human
    // this._listeners = listeners
    this._humansCount = 0
    // this._observers = []
    if (!blueprint) this._generateProperties()
    else this.importProperties(blueprint)
  }

  // vars

  get human () {
    return this._human
  }

  set human (val) {
    throw new PodError('Not allowed to set human directly')
  }

  get isMounted () {
    return (this._human instanceof Human)
  }

  get cryoBank () {
    return this._cryoBank
  }

  get inCryo () {
    return (this._cryoBank.length > 0 && !this.isMounted)
  }

  // methods

  expose () {
    return {
      properties: this.properties,
      cryoBank: this._cryoBank,
      human: this._human.expose()
    }
  }

  _generateProperties () {
    this.properties = defaults.generate()
  }

  _flush () {
    this._log('action', 'flush')
    if (!this.isMounted) throw new PodError('Human not mounted')
    // this._destroyListeners(this._human)
    delete this._human
  }

  async _terminate () {
    this._log('action', 'terminate')
    if (!this.isMounted) throw new PodError('Human not mounted')
    // this._destroyListeners(this._human)
    await this._human.do('die')
    this._flush()
  }

  _reseedOnDead (human) {
    human.observeDead()
    .then(async () => {
      this._log('action', 'reseedOnDead')
      if (this.state !== 'operating') return
      this.do('flush')
      await this.do('seed')
    })
  }

  // state machine setup

  get _machinery () {
    return {
      initialized: {
        _onEnter: states.initialized,
        assemble: actions.assemble
      },
      off: {
        _onEnter: states.off,
        powerOn: actions.powerOn
      },
      on: {
        _onEnter: states.on,
        powerOff: actions.powerOff,
        seed: actions.seed
      },
      cryo: {
        _onEnter: states.cryo,
        revive: actions.cryoRevive
      },
      operating: {
        _onEnter: states.operating,
        powerOff: actions.powerOff,
        freeze: actions.cryoFreeze,
        flush: actions.flush
      }
    }
  }

}

export default Pod
