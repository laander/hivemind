/**
 * Cluster init test
 */

import Cluster from '../index'
import * as defaults from '../defaults'

describe('Cluster: init', function () {
  it('must init, assemble and powerOn', async function (done) {
    try {
      let cluster = new Cluster()
      expect(cluster).toBeDefined()
      expect(cluster.state).toBe('initialized')
      expect(cluster.properties).toBeDefined()
      await cluster.do('assemble')
      expect(cluster.state).toBe('off')
      done()
    } catch (e) { fail(e) }
  })
  it('must init with properties and assemble', async function (done) {
    try {
      let props = defaults.generate()
      let propsJSON = JSON.stringify(props)
      let cluster = new Cluster(propsJSON)
      expect(cluster).toBeDefined()
      expect(cluster.state).toBe('initialized')
      expect(cluster.properties).toEqual(props)
      await cluster.do('assemble')
      expect(cluster.state).toBe('off')
      done()
    } catch (e) { fail(e) }
  })
  it('must init, export properties and init with same properties', async function (done) {
    try {
      let cluster = new Cluster()
      await cluster.do('assemble')
      let props = cluster.exportProperties()
      let cluster2 = new Cluster(props)
      let props2 = cluster2.exportProperties()
      expect(props2).toEqual(props)
      done()
    } catch (e) { fail(e) }
  })
})
