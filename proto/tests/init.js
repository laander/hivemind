/**
 * Human init test
 */

import Proto from '../index'
import Entity from './_entity'

describe('Proto: init', function () {
  it('must create new class that extends proto', async function (done) {
    try {
      let entity = new Entity()
      expect(entity).toBeDefined()
      expect(entity.machine).toBeDefined()
      expect(entity.state).toBe('initialized')
      expect(entity.flag).toBeTruthy()
      done()
    } catch (e) { fail(e) }
  })
  it('must create new class and perform an action', async function (done) {
    try {
      let entity = new Entity()
      expect(entity.state).toBe('initialized')
      expect(entity.flag).toBeTruthy()
      await entity.do('run')
      expect(entity.state).toBe('running')
      expect(entity.flag).toBeFalsy()
      done()
    } catch (e) { fail(e) }
  })
  it('must not initialize new class without _machinery configuration', async function (done) {
    try {
      class Entity2 extends Proto {
        constructor () { super() }
      }
      let entity = new Entity2()
      expect(entity).toBeUndefined()
      fail()
    } catch (e) {
      expect(e).toBeDefined()
      expect(e.message).toBe('_machinery not present on proto entity class')
      done()
    }
  })
  it('must support Kefir reactive streams when action is performed', async function (done) {
    try {
      let entity = new Entity()
      let spied = { onStreamPing: () => 'test' }
      spyOn(spied, 'onStreamPing')
      let stream = entity.observe().map(x => x.toState)
      stream.onValue(spied.onStreamPing)
      await entity.do('run')
      expect(spied.onStreamPing).toHaveBeenCalledWith('running')
      stream.offValue(spied.onStreamPing)
      await entity.do('continue')
      expect(spied.onStreamPing).not.toHaveBeenCalledWith('continuing')
      done()
    } catch (e) { fail(e) }
  })
})
