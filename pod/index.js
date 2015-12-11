/**
 * Pod
 */

import Proto from '../proto'
import Human from '../human'
import * as machine from './machine'
import listeners from './listeners'
import { PodError } from './utils'

class Pod extends Proto {

  constructor () {
    super({
      initialState: 'off',
      states: machine.states,
      transitions: machine.transitions,
      listeners: listeners
    })
    this._cryoBank = []
    this._human
  }

  // human vars

  get human () {
    return this._human
  }

  set human (val) {
    throw new PodError('Not allowed to set human directly')
  }

  // human lifecycle

  get isMounted () {
    return (this._human instanceof Human)
  }

  async seed () {
    if (this.isMounted) throw new PodError('Human already mounted')
    this._human = new Human()
    await this._human.machine.birth()
    this._setupListeners(this._human)
  }

  async terminate () {
    if (!this.isMounted) throw new PodError('Human not mounted')
    await this._human.machine.die()
    this.flush()
  }

  flush () {
    if (!this.isMounted) throw new PodError('Human not mounted')
    this._destroyListeners(this._human)
    delete this._human
  }

  // cryo freezing an reviving

  get cryoBank () {
    return this._cryoBank
  }

  get inCryo () {
    return (this._cryoBank.length > 0 && !this.isMounted)
  }

  async cryoFreeze () {
    if (!this.isMounted) throw new PodError('Human not mounted')
    await this._human.machine.freeze()
    this._cryoBank.push(Object.create(this._human))
    this.flush()
  }

  async cryoRevive () {
    if (this.isMounted) throw new PodError('Human already mounted')
    if (!this.inCryo) throw new PodError('No human in bank')
    this._human = this._cryoBank.pop()
    await this._human.machine.revive()
    this._setupListeners(this._human)
  }

}

export default Pod
