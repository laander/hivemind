/**
 * Pod
 */

import Human from '../human'
import * as constants from '../world/constants'
import { PodError } from './utils'

export async function assemble () {
  this._log('action', 'assemble')
  await this._sleep(constants.pod.assembling)
  this.machine.transition('off')
}

export async function powerOn () {
  this._log('action', 'powerOn')
  await this._sleep(constants.pod.powering)
  this.machine.transition('on')
}

export async function powerOff () {
  this._log('action', 'powerOff')
  if (this.isMounted) this._flush()
  await this._sleep(constants.pod.powering)
  this.machine.transition('off')
}

export async function seed () {
  this._log('action', 'seed')
  if (this.isMounted) throw new PodError('Human already mounted')
  this._human = new Human()
  await this._human.do('conceive')
  this._setupListeners(this._human)
  this.machine.transition('operating')
}

export async function cryoFreeze () {
  this._log('action', 'cryoFreeze')
  if (!this.isMounted) throw new PodError('Human not mounted')
  await this._human.do('freeze')
  this._cryoBank.push(Object.create(this._human))
  this._flush()
  this.machine.transition('cryo')
}

export async function cryoRevive () {
  this._log('action', 'cryoRevive')
  if (this.isMounted) throw new PodError('Human already mounted')
  if (!this.inCryo) throw new PodError('No human in bank')
  this._human = this._cryoBank.pop()
  await this._human.do('revive')
  this._setupListeners(this._human)
  this.machine.transition('operating')
}
