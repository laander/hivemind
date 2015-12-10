/**
 * Human actions
 */

import Chance from 'chance'
import * as constants from './constants'

// utilities

let rand = new Chance()
let cyclesPerSecond = constants.cycleTime / 1000
let modifier = cyclesPerSecond * constants.actionModifier

let noise = () => {
  return rand.floating({min: 0, max: 1})
}

function normalize (value) {
  value = Math.abs(value)
  return (value > 99 ? 99 : value)
}

function add (value, multi = 1) {
  return normalize(value + (noise() * multi * modifier))
}

function sub (value, multi = 1) {
  return normalize(value - (noise() * multi * modifier))
}

function seniority (value, age) {
  if (age < 20) return value * 0.5
  if (age >= 20 && age <= 50) return value * 1
  if (age >= 50 && age <= 80) return value * 4
  if (age >= 80 && age <= 100) return value * 8
  if (age >= 100) return value * 12
}

// actions

export function grow (props) {
  props.age = props.age + (modifier / constants.ageModifier)
  let change = (10 / seniority(noise(), props.age)) * modifier / 1000
  props.weight = props.weight + change
  return props
}

export function fatality (props) {
  let chance = (props.age * modifier) / 10000
  chance = seniority(chance, props.age)
  return rand.bool({likelihood: (chance < 99 ? chance : 99)})
}

export function idle (props) {
  props.hunger = add(props.hunger)
  props.tired = add(props.tired, 0.5)
  props.energy = sub(props.energy, 0.5)
  return props
}

export function eat (props) {
  props.hunger = sub(props.hunger, 3)
  props.weight = add(props.weight, 0.5)
  props.bowel = add(props.bowel, 2)
  props.tired = add(props.tired, 0.5)
  props.energy = add(props.energy)
  return props
}

export function sleep (props) {
  props.tired = sub(props.tired, 2)
  props.energy = add(props.energy, 2)
  return props
}

export function defecate (props) {
  props.bowel = sub(props.bowel, 4)
  return props
}

export function workout (props) {
  props.tired = add(props.tired, 2)
  props.hunger = add(props.hunger)
  props.energy = sub(props.energy, 2)
  return props
}
