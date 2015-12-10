/**
 * Human init test
 */

import Human from '../index'
import testProperties from './helpers/properties'

describe('human', () => {
  it('must init', () => {
    let human = new Human()
    expect(human).toBeDefined()
    expect(human.properties).toBeDefined()
    expect(human.heartbeat).toBeDefined()
    expect(human.state).toBe('embryo')
  })
  it('must init with properties', () => {
    let human = new Human(testProperties)
    expect(human).toBeDefined()
    expect(human.properties).toBeDefined()
    expect(human.heartbeat).toBeDefined()
    expect(human.state).toBe('idle')
  })
  it('must init, freeze and unfreeze', () => {
    // create human and freeze it
    let human = new Human()
    human.machine.freeze()
    expect(human.state).toBe('frozen')
    let props = human.exportProperties()
    // unfreeze human again
    human.importProperties(props)
    human.machine.idle()
    expect(human.state).toBe('idle')
  })
  it('must init, export properties and init new instance with properties', () => {
    // create human and freeze it
    let human = new Human()
    let props = human.exportProperties()
    // unfreeze human again
    let human2 = new Human(props)
    human2.importProperties(props)
    expect(human2.properties).toBeDefined()
    expect(human2.state).toBe(JSON.parse(props).state)
  })
})
