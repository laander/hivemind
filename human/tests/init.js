/**
 * Human init test
 */

import Human from '../index'
import testProperties from './helpers/properties'

describe('human', () => {
  it('must init', () => {
    let human = new Human()
    expect(human).toBeDefined()
    expect(human.state).toBe('initialized')
    expect(human.properties).toBeDefined()
    human.machine.conceive()
    expect(human.state).toBe('embryo')
    expect(human.cycle).toBeDefined()
  })
  it('must init with properties', () => {
    let human = new Human(testProperties)
    expect(human).toBeDefined()
    expect(human.state).toBe('initialized')
    expect(human.properties).toBeDefined()
    human.machine.conceive()
    expect(human.state).toBe('idle')
    expect(human.cycle).toBeDefined()
  })
  it('must init, freeze and unfreeze', () => {
    // create human and freeze it
    let human = new Human()
    human.machine.conceive()
    human.machine.birth()
    human.machine.freeze()
    expect(human.state).toBe('frozen')
    let props = human.exportProperties()
    // unfreeze human again
    human.importProperties(props)
    human.machine.revive()
    expect(human.state).toBe('idle')
  })
  it('must init, export properties and init new instance with properties', () => {
    // create human and freeze it
    let human = new Human()
    human.machine.birth()
    let props = human.exportProperties()
    // unfreeze human again
    let human2 = new Human(props)
    let props2 = human2.exportProperties()
    expect(props2).toEqual(props)
  })
})
