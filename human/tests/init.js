/**
 * Human init test
 */

import Human from '../index'
import * as defaults from '../defaults'

describe('Human: init', function () {
  it('must init and conceive', async function (done) {
    try {
      let human = new Human()
      expect(human).toBeDefined()
      expect(human.state).toBe('initialized')
      expect(human.properties).toBeDefined()
      await human.do('conceive')
      expect(human.state).toBe('embryo')
      done()
    } catch (e) { fail(e) }
  })
  it('must init with properties and conceive', async function (done) {
    try {
      let props = defaults.generate()
      let propsJSON = JSON.stringify(props)
      let human = new Human(propsJSON)
      expect(human).toBeDefined()
      expect(human.state).toBe('initialized')
      expect(human.properties).toEqual(props)
      await human.do('conceive')
      expect(human.state).toBe('embryo')
      done()
    } catch (e) { fail(e) }
  })
  it('must init, freeze and revive again', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      await human.when('idle')
      await human.do('freeze')
      expect(human.state).toBe('frozen')
      let props = human.exportProperties()
      human.importProperties(props)
      await human.do('revive')
      expect(human.state).toBe('idle')
      done()
    } catch (e) { fail(e) }
  })
  it('must init, export properties and init with same properties', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      let props = human.exportProperties()
      let human2 = new Human(props)
      let props2 = human2.exportProperties()
      expect(props2).toEqual(props)
      done()
    } catch (e) { fail(e) }
  })
})
