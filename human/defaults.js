/**
 * Human conception generator
 */

import Chance from 'chance'
import moment from 'moment'

var rand = new Chance()

function guid () {
  return rand.guid()
}

function name () {
  return rand.name()
}

function gender () {
  return rand.gender()
}

function birthday () {
  return moment().format()
}

function ssn () {
  return rand.ssn()
}

let age = 0
let weight = 1
let energy = 99
let hunger = 1
let tired = 1
let bowel = 1
let deathday = null
let state = 'embryo'

export function generate () {
  return {
    guid: guid(),
    name: name(),
    gender: gender(),
    birthday: birthday(),
    ssn: ssn(),
    deathday: deathday,
    age: age,
    weight: weight,
    energy: energy,
    hunger: hunger,
    tired: tired,
    bowel: bowel,
    state: state
  }
}
