/**
 * Cluster
 */

import Pod from '../pod'
import Proto from '../proto'
import * as machine from './machine'
import { ClusterError } from './utils'
import * as lo from 'lodash'

class Cluster extends Proto {

  constructor () {
    super({
      initialState: 'off',
      states: machine.states,
      transitions: machine.transitions
    })
    this._pods = []
  }

  // pod var

  get pods () {
    return this._pods
  }

  set pods (val) {
    throw new ClusterError('Not allowed to set pod directly')
  }

  // instrumentation

  async attach () {
    let pod = new Pod()
    this._pods.push(pod)
    await pod.machine.powerOn()
    await pod.seed()
  }

  async generate (amount) {
    let promises = []
    lo.times(amount, () => {
      promises.push(this.attach())
    })
    await Promise.all(promises)
  }

}

export default Cluster
