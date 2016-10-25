import moment from 'moment'
import constants from './constants'

function outputGuid (entity) {
  return entity.properties && entity.properties.guid ? '(' + entity.properties.guid + ')' : ''
}

function outputName (entity) {
  if (entity.constructor.name === 'String') return entity
  return entity.constructor.name
}

function consoleLog (entity, ...data) {
  console.log(
    moment().format('hh:mm:ss'),
    '|',
    outputName(entity),
    outputGuid(entity),
    '=>',
    ...data
  )
}

function relayLog (entity, ...data) {}

export function log (entity, ...data) {
  if (constants.consoleLog) consoleLog(entity, ...data)
  if (constants.relayLog) relayLog(entity, ...data)
}
