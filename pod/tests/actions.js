/**
 * Pod init test
 */

import Pod from '../index'
import Human from '../../human'

describe('Pod: actions', function () {
  it('must init, assemble, seed and powerOff (and thus kill human)', async function (done) {
    try {
      let pod = new Pod()
      expect(pod.state).toBe('initialized')
      await pod.do('assemble')
      expect(pod.state).toBe('off')
      await pod.do('powerOn')
      expect(pod.state).toBe('on')
      await pod.do('seed')
      expect(pod.state).toBe('operating')
      expect(pod.isMounted).toBeTruthy()
      expect(pod.human).toEqual(jasmine.any(Human))
      expect(pod.human.state).toEqual('embryo')
      await pod.do('powerOff')
      expect(pod.state).toBe('off')
      expect(pod.isMounted).toBeFalsy()
      expect(pod.human).toBeUndefined()
      done()
    } catch (e) { fail(e) }
  })
  it('must be able to freeze and revive human', async function (done) {
    try {
      let pod = new Pod()
      expect(pod.state).toBe('initialized')
      await pod.do('assemble')
      await pod.do('powerOn')
      await pod.do('seed')
      await pod.do('freeze')
      expect(pod.state).toEqual('cryo')
      expect(pod.inCryo).toBe(true)
      await pod.do('revive')
      expect(pod.state).toEqual('operating')
      expect(pod.inCryo).toBe(false)
      done()
    } catch (e) { fail(e) }
  })
  it('must auto reseed when human dies', async function (done) {
    try {
      let pod = new Pod()
      expect(pod.state).toBe('initialized')
      await pod.do('assemble')
      await pod.do('powerOn')
      await pod.do('seed')
      let firstHuman = pod.human.properties.guid
      expect(pod._humansCount).toBe(1)
      await pod.human.observeDead()
      expect(pod.state).toEqual('on')
      expect(pod.human.state).toEqual('embryo')
      expect(firstHuman).not.toEqual(pod.human.properties.guid)
      expect(pod._humansCount).toBe(2)
      done()
    } catch (e) { fail(e) }
  })
})
