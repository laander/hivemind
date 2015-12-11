/**
 * Proto
 */

import machina from 'machina'

class Proto {

  constructor (settings) {
    this._setupMachine(settings)
    this._listeners = settings.listeners
  }

  get state () {
    return this.machine.state
  }

  _setupMachine (settings) {
    let newStates = {}
    Object.keys(settings.states).forEach(state => newStates[state] = { _onEnter: settings.states[state] })
    let machineSettings = Object.assign({
      initialize: function () {
        this.mother = this
      },
      namespace: 'human',
      initialState: settings.initialState,
      states: newStates
    }, settings.transitions)
    this.machine = new machina.Fsm(machineSettings)
  }

  _fireListeners (data) {
    if (this._listeners[data.toState]) this._listeners[data.toState].call(this)
  }

  _setupListeners (child) {
    child.machine.on('transition', this._fireListeners.bind(this))
  }

  _destroyListeners (child) {
    child.machine.off('transition', this._fireListeners.bind(this))
  }

}

export default Proto
