/**
 * Proto
 */

import constants from '../world/constants'
import machina from 'machina'
import moment from 'moment'
import Kefir from 'kefir'

class Proto {

  constructor () {
    this._setupMachine()
    this._listenerInstances = []
  }

  get state () {
    return this.machine.state
  }

  do (doAction, args) {
    let result = this.machine.handle(doAction, args)
    if (!result) throw new Error('Cant perform action "' + doAction + '", handle not found in current state "' + this.state + '"')
    return result
  }

  on (action) {
    return new Promise(resolve => {
      let event = this.machine.on('handled', data => {
        if (data.inputType !== action) return
        event.off()
        resolve()
      })
    })
  }

  when (state) {
    return new Promise(resolve => {
      let event = this.machine.on('transition', data => {
        if (data.toState !== state) return
        event.off()
        resolve()
      })
    })
  }

  whenDone (state) {
    return new Promise(resolve => {
      let event = this.machine.on('transition', data => {
        if (data.fromState !== state) return
        event.off()
        resolve()
      })
    })
  }

  importProperties (properties) {
    this.properties = JSON.parse(properties)
  }

  exportProperties () {
    return JSON.stringify(this.properties)
  }

  _log (...data) {
    // if (this.constructor.name === 'Human') return
    if (!constants.log) return
    console.log(moment().format('hh:mm:ss'), '|', this.constructor.name, '=>', ...data)
  }

  _sleep (time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  _setupMachine () {
    let newStates = {}
    if (!this._machinery) throw new Error('_machinery not present on proto entity class')
    let settings = { states: this._machinery }
    Object.keys(settings.states).forEach(state => {
      newStates[state] = {}
      Object.keys(settings.states[state]).forEach(func => {
        newStates[state][func] = settings.states[state][func].bind(this)
      })
      // newStates[state]._onExit = () => { this._log('exiting', this.state) }
    })
    let machineSettings = {
      namespace: 'machine',
      initialState: 'initialized',
      states: newStates
    }
    this.machine = new machina.Fsm(machineSettings)
  }

  _fireListeners (data) {
    // console.log('FIRE', this)
    if (!this._listeners || !this._listeners[data.toState]) return
    this._listeners[data.toState].call(this)
    .catch(this._log)
  }

  _setupListeners (child) {
    this._listenerInstances[child] = child.machine.on('transition', this._fireListeners.bind(this))
  }

  _destroyListeners (child) {
    this._listenerInstances[child].off()
  }

  observe (event = 'transition') {
    return Kefir.fromEvents(this.machine, event)
  }

}

export default Proto
