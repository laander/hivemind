/**
 * Human init test
 */

import Proto from '../index'

export default class Entity extends Proto {
  constructor () {
    super()
  }
  get _machinery () {
    return {
      initialized: {
        _onEnter: function () { this.flag = true },
        run: async function () { this.machine.transition('running') }
      },
      running: {
        _onEnter: function () { this.flag = false },
        continue: async function () { this.machine.transition('continuing') }
      },
      continuing: {
        _onEnter: function () { this.flag = true }
      }
    }
  }
}
