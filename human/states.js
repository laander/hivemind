/**
 * Human
 */

import * as modifiers from './modifiers'
import moment from 'moment'

export function initialized () {
  this._log('state', 'initialized')
}

export function embryo () {
  this._log('state', 'embryo')
  this.cycleStart(() => {
    let props = this.properties
    props = modifiers.idle(props)
    if (props.age > 0.1) this.do('birth')
  })
}

export function idle () {
  this._log('state', 'idle')
  this.cycleStart(() => {
    let props = this.properties
    props = modifiers.idle(props)
    if (props.hunger > 90) this.do('eat')
    else if (props.bowel > 90) this.do('defecate')
    else if (props.tired > 90) this.do('sleep')
  })
}

export function frozen () {
  this._log('state', 'frozen')
  this.cycleStop()
}

export function sleeping () {
  this._log('state', 'sleeping')
  this.cycleStart(() => {
    let props = this.properties
    props = modifiers.sleep(props)
    if (props.tired < 5) this.do('idle')
  })
}

export function eating () {
  this._log('state', 'eating')
  this.cycleStart(() => {
    let props = this.properties
    props = modifiers.eat(props)
    if (props.hunger < 5) this.do('idle')
  })
}

export function defecating () {
  this._log('state', 'defecating')
  this.cycleStart(() => {
    let props = this.properties
    props = modifiers.defecate(props)
    if (props.bowel < 5) this.do('idle')
  })
}

export function dead () {
  this._log('state', 'dead')
  this.properties.deathday = moment().format()
  this.cycleStop()
}
