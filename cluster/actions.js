/**
 * Cluster
 */

import * as constants from '../world/constants'
import * as lo from 'lodash'

export async function assemble () {
  this._log('action', 'assemble')
  await this._sleep(constants.cluster.assembling)
  this.machine.transition('off')
}

export async function powerOn () {
  this._log('action', 'powerOn')
  await this._sleep(constants.cluster.powering)
  this.machine.transition('on')
}

export async function powerOff () {
  this._log('action', 'powerOff')
  await this._shutdownPods()
  await this._sleep(constants.cluster.powering)
  this.machine.transition('off')
}

export async function generatePods (amount) {
  this._log('action', 'generatePods')
  await lo.range(amount).reduce(cur => {
    return cur.then(() => this._constructPod())
  }, Promise.resolve())
  this.machine.transition('operating')
}

export async function activatePods () {
  this._log('action', 'activatePods')
  await this._pods.reduce((prev, pod) => {
    return prev.then(() => pod.do('powerOn'))
  }, Promise.resolve())
  this.machine.transition('operating')
}

export async function cryoFreezePods () {
  this._log('action', 'cryoFreezePods')
  await this._pods.reduce((prev, pod) => {
    return prev.then(() => pod.do('freeze'))
  }, Promise.resolve())
}

export async function cryoRevivePods () {
  this._log('action', 'cryoRevivePods')
  await this._pods.reduce((prev, pod) => {
    return prev.then(() => pod.do('revive'))
  }, Promise.resolve())
}
