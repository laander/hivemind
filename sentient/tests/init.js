/**
 * Pod init test
 */

import Sentient from '../index'
import trainData from './_train'

describe('Sentient: init', function () {
  it('must be able to train and return correct decision', async function (done) {
    try {
      let ai = new Sentient()
      let trainResult = ai.train(trainData)
      expect(trainResult.iterations).toBeGreaterThan(1)
      let decideResult = ai.decide([0, 99, 0, 0])
      // expect(Math.max(...decideResult)).toEqual(decideResult[1])
      // expect(decideResult[1]).toBeGreaterThan(0.9)
      expect(decideResult).toEqual('eat')
      // console.log(decideResult)
      done()
    } catch (e) { fail(e) }
  })
})
