/**
 * Orchestrator
 */

import World from './index'
import moment from 'moment'

let loopInterval

var world = new World()
var cluster = world.cluster

export async function start (amount = 3) {
  await cluster.do('assemble')
  await cluster.do('powerOn')
  await cluster.do('generatePods', amount)
  _loop()
}

export async function schemas () {
  let schemas = {}
  world.entities.map(Entity => {
    let instance = new Entity()
    schemas[instance.constructor.name] = instance.schema
  })
  console.log(schemas)
}

export async function clusterDo (action) {
  await cluster.do(action)
  _loop()
}

export async function generatePods (amount = 3) {
  await cluster.do('generatePods', amount)
  _loop()
}

export async function powerOutage () {
  await cluster.do('powerOff')
  _loop()
}

export async function powerRecover () {
  await cluster.do('powerOn')
  await cluster.do('activatePods')
  await cluster.do('seedPods')
  _loop()
}

export async function freeze () {
  await cluster.do('cryoFreezePods')
  _loop()
}

export async function revive () {
  await cluster.do('cryoRevivePods')
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
    cluster.state,
    '[' + cluster.pods.length + ']'
  )
  if (cluster.pods.length < 1) return
  cluster.pods.forEach(pod => {
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
