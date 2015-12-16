/**
 * Human init test
 */

import Human from '../index'

describe('Human: actions', function () {
  it('must init, conceive, birth, idle, freeze, revive, die', async function (done) {
    try {
      let human = new Human()
      expect(human.state).toBe('initialized')
      await human.do('conceive')
      expect(human.state).toBe('embryo')
      await human.whenDone('embryo')
      expect(human.state).toBe('idle')
      await human.do('freeze')
      expect(human.state).toBe('frozen')
      await human.do('revive')
      expect(human.state).toBe('idle')
      await human.do('die')
      expect(human.state).toBe('dead')
      done()
    } catch (e) { fail(e) }
  })
  it('must auto eat when hungry', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      await human.whenDone('embryo')
      await human.when('eating')
      let hunger = human.properties.hunger
      let bowel = human.properties.bowel
      let energy = human.properties.energy
      await human.whenDone('eating')
      expect(human.state).toBe('idle')
      expect(human.properties.hunger).toBeLessThan(hunger)
      expect(human.properties.bowel).toBeGreaterThan(bowel)
      expect(human.properties.energy).toBeGreaterThan(energy)
      done()
    } catch (e) { fail(e) }
  })
  it('must auto sleep when sleepy', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      await human.whenDone('embryo')
      await human.when('sleeping')
      let tired = human.properties.tired
      let energy = human.properties.energy
      await human.whenDone('sleeping')
      expect(human.state).toBe('idle')
      expect(human.properties.tired).toBeLessThan(tired)
      expect(human.properties.energy).toBeGreaterThan(energy)
      done()
    } catch (e) { fail(e) }
  })
  it('must auto defecate when needy', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      await human.whenDone('embryo')
      await human.when('defecating')
      let bowel = human.properties.bowel
      await human.whenDone('defecating')
      expect(human.state).toBe('idle')
      expect(human.properties.bowel).toBeLessThan(bowel)
      done()
    } catch (e) { fail(e) }
  })
  it('must grow older with time', async function (done) {
    try {
      let human = new Human()
      await human.do('conceive')
      let age = human.properties.age
      await human.whenDone('embryo')
      expect(human.properties.age).toBeGreaterThan(age)
      done()
    } catch (e) { fail(e) }
  })
})
