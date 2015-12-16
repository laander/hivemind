/**
 * Human init test
 */

import Proto from '../index'

describe('Proto: init', function () {
  it('must create new class that extends proto', async function (done) {
    try {
      class Entity extends Proto {
        constructor () {
          super()
        }
        get _machinery () {
          return {
            initialized: {
              _onEnter: function () { this.flag = true }
            }
          }
        }
      }
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
      class Entity extends Proto {
        constructor () {
          super()
        }
        get _machinery () {
          return {
            initialized: {
              _onEnter: function () { this.flag = false },
              run: async function () { this.machine.transition('running') }
            },
            running: {
              _onEnter: function () { this.flag = true }
            }
          }
        }
      }
      let entity = new Entity()
      expect(entity.state).toBe('initialized')
      expect(entity.flag).toBeFalsy()
      await entity.do('run')
      expect(entity.state).toBe('running')
      expect(entity.flag).toBeTruthy()
      done()
    } catch (e) { fail(e) }
  })
  it('must not initialize new class without _machinery configuration', async function (done) {
    try {
      class Entity extends Proto {
        constructor () {
          super()
        }
      }
      let entity = new Entity()
      expect(entity).toBeUndefined()
      fail()
    } catch (e) {
      expect(e).toBeDefined()
      expect(e.message).toBe('_machinery not present on proto entity class')
      done()
    }
  })
})
