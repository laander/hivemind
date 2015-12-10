/**
 * Human actions
 */

import Chance from 'chance'
import * as constants from './constants'

// utilities

let rand = new Chance()
let mod = () => {
  return rand.floating({min: 0, max: 1})
}

function normalize (value) {
  value = Math.abs(value)
  return (value > 99 ? 99 : value)
}

function add (value, multi = 1) {
  return normalize(value + (mod() * multi * constants.cycleTime / constants.actionModifier))
}

function sub (value, multi = 1) {
  return normalize(value - (mod() * multi * constants.cycleTime / constants.actionModifier))
}

function weight (props) {
  let change = (rand.bool() ? 1 : -1)
  if (props.age > 0.1 && props.age < 20) {
    props.weight = props.weight + ((change + mod()) * constants.cycleTime / constants.actionModifier / constants.ageModifier * 2)
  }
  if (props.age >= 20 && props.age <= 50) {
    props.weight = props.weight + ((change + mod()) * constants.cycleTime / constants.actionModifier / constants.ageModifier)
  }
  if (props.age >= 50 && props.age <= 80) {
    props.weight = props.weight + ((change + mod()) * constants.cycleTime / constants.actionModifier / constants.ageModifier * 0.5)
  }
  return props
}

// actions

export function grow (props) {
  props.age = props.age + (constants.cycleTime / constants.actionModifier / constants.ageModifier)
  props = weight(props)
  return props
}

export function fatality (props) {
  let chance = props.age / constants.cycleTime / constants.actionModifier * 10
  return rand.bool({likelihood: (chance < 99 ? chance : 99)})
}

export function idle (props) {
  props.hunger = add(props.hunger)
  props.tired = add(props.tired, 0.5)
  props.energy = sub(props.energy, 0.5)
  return props
}

export function eat (props) {
  props.hunger = sub(props.hunger, 2)
  props.weight = add(props.weight, 0.5)
  props.bowel = add(props.bowel, 2)
  props.tired = add(props.tired, 0.5)
  props.energy = add(props.energy)
  return props
}

export function sleep (props) {
  props.tired = sub(props.tired, 3)
  props.energy = add(props.energy, 2)
  return props
}

export function defecate (props) {
  props.bowel = sub(props.bowel, 2)
  return props
}

export function workout (props) {
  props.tired = add(props.tired, 2)
  props.hunger = add(props.hunger)
  props.energy = sub(props.energy, 2)
  return props
}
