/**
 * Human
 */

import constants from '../world/constants'

export async function conceive () {
  this._log('action', 'conceive')
  this.machine.transition('embryo')
}

export async function birth () {
  this._log('action', 'birth')
  this.machine.transition('idle')
}

export async function idle () {
  this._log('action', 'idle')
  this.machine.transition('idle')
}

export async function sleep () {
  this._log('action', 'sleep')
  this.machine.transition('sleeping')
}

export async function eat () {
  this._log('action', 'eat')
  this.machine.transition('eating')
}

export async function defecate () {
  this._log('action', 'defecate')
  this.machine.transition('defecating')
}

export async function freeze () {
  this._log('action', 'freeze')
  await this._sleep(constants.human.cryo)
  this.machine.transition('frozen')
}

export async function revive () {
  this._log('action', 'revive')
  await this._sleep(constants.human.cryo)
  this.machine.transition('idle')
}

export async function die () {
  this._log('action', 'die')
  this.machine.transition('dead')
}
