/**
 * Human conception generator
 */

import Chance from 'chance'
import moment from 'moment'

var rand = new Chance()

export function guid () {
  return rand.guid()
}

export function name () {
  return rand.name()
}

export function gender () {
  return rand.gender()
}

export function birthday () {
  return moment().format()
}

export function ssn () {
  return rand.ssn()
}

export var age = 0
export var weight = 1
export var energy = 99
export var hunger = 1
export var tired = 1
export var bowel = 1
export var deathday = null
