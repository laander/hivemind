/**
 * Cluster
 */

import Proto from '../proto'
import Pod from '../pod'
import { ClusterError } from './utils'
import * as actions from './actions'
import * as states from './states'

class Cluster extends Proto {

  constructor () {
    super()
    this._pods = []
  }

  // vars

  get pods () {
    return this._pods
  }

  set pods (val) {
    throw new ClusterError('Not allowed to set pod directly')
  }

  // methods

  async _constructPod () {
    this._log('action', 'constructPod')
    let pod = new Pod()
    this._pods.push(pod)
    await pod.do('assemble')
    await pod.do('powerOn')
    await pod.do('seed')
  }

  async _shutdownPods () {
    this._log('action', 'shutdownPods')
    await this._pods.reduce((prev, pod) => {
      return prev.then(() => pod.do('powerOff'))
    }, Promise.resolve())
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
        generatePods: actions.generatePods,
        activatePods: actions.activatePods
      },
      operating: {
        _onEnter: states.operating,
        powerOff: actions.powerOff,
        generatePods: actions.generatePods,
        seedPods: actions.seedPods,
        cryoFreezePods: actions.cryoFreezePods,
        cryoRevivePods: actions.cryoRevivePods
      }
    }
  }

}

export default Cluster
