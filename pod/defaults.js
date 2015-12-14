/**
 * Human conception generator
 */

import Chance from 'chance'
import moment from 'moment'

var rand = new Chance()

function guid () {
  return rand.guid()
}

function birthday () {
  return moment().format()
}

export function generate () {
  return {
    guid: guid(),
    birthday: birthday()
  }
}
