/**
 * Orchestrator
 */

import world from './index'
import Cluster from '../cluster'
import moment from 'moment'
import * as logger from './logger'

let loopInterval

export function init () {
  logger.log('Orchestrator', 'loaded')
}

export async function start (amount = 3) {
  world.cluster = new Cluster()
  await world.cluster.do('assemble')
  await world.cluster.do('powerOn')
  await world.cluster.do('generatePods', amount)
  _loop()
}

export async function schemas () {
  let schemas = {}
  Object.keys(world.entities).map(entity => {
    let instance = new world.entities[entity]()
    schemas[instance.constructor.name] = instance.schema
  })
  logger.log('Orchestrator', 'schemas', schemas)
}

export function expose () {
  let result = world.cluster.expose()
  logger.log('Orchestrator', 'Expose', result)
  return result
}

export async function clusterDo (action) {
  await world.cluster.do(action)
  _loop()
}

export async function generatePods (amount = 3) {
  await world.cluster.do('generatePods', amount)
  _loop()
}

export async function powerOutage () {
  await world.cluster.do('powerOff')
  _loop()
}

export async function powerRecover () {
  await world.cluster.do('powerOn')
  await world.cluster.do('activatePods')
  await world.cluster.do('seedPods')
  _loop()
}

export async function freeze () {
  await world.cluster.do('cryoFreezePods')
  _loop()
}

export async function revive () {
  await world.cluster.do('cryoRevivePods')
  _loop()
}

export function listen () {
  loopInterval = setInterval(_loop, 50)
}

export function unlisten () {
  clearInterval(loopInterval)
}

function _loop () {
  console.log('----------------')
  console.log(
    moment().format('hh:mm:ss'),
    'Cluster:',
    world.cluster.state,
    '[' + world.cluster.pods.length + ']'
  )
  if (world.cluster.pods.length < 1) return
  world.cluster.pods.forEach(pod => {
    if (pod.isMounted) _out(pod, pod.human)
    if (pod.inCryo) _out(pod, pod.cryoBank[0])
  })
}

function _out (pod, human) {
  console.log(
    moment().format('hh:mm:ss'),
    '|',
    pod.state,
    '[' + pod._humansCount + ']',
    '|',
    Math.round(human.properties.age) + ' - ' +
    human.properties.name + ' - ' +
    human.state + ' - ( ' +
    Math.round(human.properties.energy),
    Math.round(human.properties.hunger),
    Math.round(human.properties.tired),
    Math.round(human.properties.bowel) + ' )'
  )
}
