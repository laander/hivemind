/**
 * Pod init test
 */

import Cluster from '../index'
import Pod from '../../pod'
// import * as defaults from '../defaults'

describe('Cluster: actions', function () {
  it('must init, assemble, generatePods, powerOff, powerOn, activatePods and seedPods', async function (done) {
    try {
      let cluster = new Cluster()
      expect(cluster.state).toBe('initialized')
      await cluster.do('assemble')
      expect(cluster.state).toBe('off')
      await cluster.do('powerOn')
      expect(cluster.state).toBe('on')
      await cluster.do('generatePods')
      expect(cluster.state).toBe('operating')
      expect(cluster.pods.length).toBeGreaterThan(0)
      expect(cluster.pods[0]).toEqual(jasmine.any(Pod))
      expect(cluster.pods[0].state).toEqual('operating')
      await cluster.do('powerOff')
      expect(cluster.state).toBe('off')
      expect(cluster.pods[0].state).toEqual('off')
      await cluster.do('powerOn')
      expect(cluster.state).toBe('on')
      expect(cluster.pods[0].state).toEqual('off')
      await cluster.do('activatePods')
      expect(cluster.state).toBe('operating')
      expect(cluster.pods[0].state).toEqual('on')
      await cluster.do('seedPods')
      expect(cluster.pods[0].state).toEqual('operating')
      done()
    } catch (e) { fail(e) }
  })
  it('must generate customer number of pods', async function (done) {
    try {
      let cluster = new Cluster()
      await cluster.do('assemble')
      await cluster.do('powerOn')
      await cluster.do('generatePods', 10)
      expect(cluster.pods.length).toBe(10)
      cluster.pods.forEach(pod => {
        expect(pod.state).toEqual('operating')
      })
      done()
    } catch (e) { fail(e) }
  })
  it('must be able to send pods into cryo freeze and revive', async function (done) {
    try {
      let cluster = new Cluster()
      expect(cluster.state).toBe('initialized')
      await cluster.do('assemble')
      await cluster.do('powerOn')
      await cluster.do('generatePods')
      await cluster.do('cryoFreezePods')
      expect(cluster.state).toEqual('operating')
      expect(cluster.pods[0].state).toBe('cryo')
      expect(cluster.pods[0].inCryo).toBe(true)
      await cluster.do('cryoRevivePods')
      expect(cluster.state).toEqual('operating')
      expect(cluster.pods[0].state).toBe('operating')
      expect(cluster.pods[0].inCryo).toBe(false)
      done()
    } catch (e) { fail(e) }
  })
})
