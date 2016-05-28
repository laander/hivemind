/**
 * Pod init test
 */

import Pod from '../index'
// import Human from '../../human'
import * as defaults from '../defaults'

describe('Pod: init', function () {
  it('must init, assemble and powerOn', async function (done) {
    try {
      let pod = new Pod()
      expect(pod).toBeDefined()
      expect(pod.state).toBe('initialized')
      expect(pod.properties).toBeDefined()
      await pod.do('assemble')
      expect(pod.state).toBe('off')
      done()
    } catch (e) { fail(e) }
  })
  it('must init with properties and assemble', async function (done) {
    try {
      let props = defaults.generate()
      let propsJSON = JSON.stringify(props)
      let pod = new Pod(propsJSON)
      expect(pod).toBeDefined()
      expect(pod.state).toBe('initialized')
      expect(pod.properties).toEqual(props)
      await pod.do('assemble')
      expect(pod.state).toBe('off')
      done()
    } catch (e) { fail(e) }
  })
  it('must init, export properties and init with same properties', async function (done) {
    try {
      let pod = new Pod()
      await pod.do('assemble')
      let props = pod.exportProperties()
      let pod2 = new Pod(props)
      let props2 = pod2.exportProperties()
      expect(props2).toEqual(props)
      done()
    } catch (e) { fail(e) }
  })
})
